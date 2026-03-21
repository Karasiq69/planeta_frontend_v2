import { chromium, type FullConfig } from '@playwright/test'
import { API_URL, TEST_USER } from './e2e/fixtures/test-constants'
import { RECORD_MODE, readGlobalMocks, writeGlobalMocks } from './e2e/fixtures/mock-config'
import fs from 'fs'
import path from 'path'

async function globalSetup(config: FullConfig) {
  const frontendURL = config.projects[0].use.baseURL || 'http://localhost:3000'

  if (!RECORD_MODE) {
    const mocks = readGlobalMocks()
    if (!mocks) throw new Error('No global mocks found. Run with RECORD_MODE=true first.')

    const authDir = path.join(__dirname, '.auth')
    if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true })

    fs.writeFileSync(path.join(authDir, 'seeded-data.json'), JSON.stringify(mocks.seededData, null, 2))
    fs.writeFileSync(path.join(authDir, 'user.json'), JSON.stringify(mocks.storageState, null, 2))

    console.log('Global setup complete (replay mode)')
    return
  }

  // 1. Wait for backend to be ready
  console.log(`Waiting for backend (${API_URL})...`)
  await waitForService(`${API_URL}/`, 30_000)
  console.log('Backend is ready')

  // 2. Wait for frontend
  console.log(`Waiting for frontend (${frontendURL})...`)
  await waitForService(frontendURL, 30_000)
  console.log('Frontend is ready')

  // 3. Login via API to get cookies
  console.log(`Logging in as ${TEST_USER.email}...`)
  const loginRes = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: TEST_USER.email, password: TEST_USER.password }),
  })

  if (!loginRes.ok) {
    throw new Error(`Login failed: ${loginRes.status} ${await loginRes.text()}`)
  }

  // Extract cookies from Set-Cookie headers
  const setCookieHeaders = loginRes.headers.getSetCookie()
  const cookies = setCookieHeaders.map((header) => {
    const [nameValue] = header.split(';')
    const [name, ...valueParts] = nameValue.trim().split('=')
    return { name: name.trim(), value: valueParts.join('=').trim(), domain: 'localhost', path: '/' }
  })

  const accessCookie = cookies.find((c) => c.name === 'access')
  if (!accessCookie) throw new Error('No access cookie after login')

  const authHeaders = {
    Cookie: `access=${accessCookie.value}`,
    'Content-Type': 'application/json',
  }

  // 4. Get organization ID and hourly rate
  let organizationId: number | null = null
  let organizationHourlyRate: number | null = null
  const orgRes = await fetch(`${API_URL}/api/organization`, { headers: authHeaders })
  if (orgRes.ok) {
    const orgData = await orgRes.json()
    const orgs = Array.isArray(orgData?.data) ? orgData.data : orgData?.data?.data
    if (orgs && orgs.length > 0) {
      organizationId = orgs[0].id
      organizationHourlyRate = orgs[0].hourlyRate ?? null
    }
  }
  console.log(`Organization ID: ${organizationId}, Hourly Rate: ${organizationHourlyRate}`)

  const orgHeaders = { ...authHeaders, 'x-organization-id': String(organizationId) }

  // 5. Fetch existing services, products, employees, clients from API
  const [servicesData, productsData, employeesData, clientsData] = await Promise.all([
    fetchJson(`${API_URL}/api/services`, orgHeaders),
    fetchJson(`${API_URL}/api/products`, orgHeaders),
    fetchJson(`${API_URL}/api/employees`, orgHeaders),
    fetchJson(`${API_URL}/api/clients`, orgHeaders),
  ])

  const services = extractItems(servicesData, ['id', 'name', 'defaultDuration', 'unit'])
  const products = extractItems(productsData, ['id', 'name', 'price', 'sku', 'partNumber', 'unit'])
  const employees = extractItems(employeesData, ['id', 'firstName', 'lastName', 'position', 'hourlyRate'])
  const clients = extractItems(clientsData, ['id', 'firstName', 'lastName', 'phone', 'type', 'companyName'])

  const serviceIds = services.map((s: any) => s.id)
  const productIds = products.map((p: any) => p.id)
  const mechanicIds = employees.filter((e: any) => e.position === 'mechanic').map((e: any) => e.id)
  const clientIds = clients.map((c: any) => c.id)

  console.log(`Services: ${services.length}, Products: ${products.length}, Employees: ${employees.length}, Clients: ${clients.length}`)

  // 6. Save auth state via browser
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto(frontendURL, { waitUntil: 'domcontentloaded', timeout: 30_000 })

  // Set cookies from API login
  await context.addCookies(
    cookies.map((c) => ({
      ...c,
      domain: new URL(frontendURL).hostname,
    }))
  )

  // Save storage state
  const authDir = path.join(__dirname, '.auth')
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true })
  await context.storageState({ path: path.join(authDir, 'user.json') })

  // Save metadata for tests
  fs.writeFileSync(
    path.join(authDir, 'seeded-data.json'),
    JSON.stringify(
      {
        cookies,
        organizationId,
        organizationHourlyRate,
        services,
        products,
        employees,
        clients,
        serviceIds,
        productIds,
        mechanicIds,
        clientIds,
        warehouseId: null,
        cashRegisterId: null,
      },
      null,
      2
    )
  )

  await browser.close()

  const storageState = JSON.parse(fs.readFileSync(path.join(authDir, 'user.json'), 'utf-8'))
  const seededData = JSON.parse(fs.readFileSync(path.join(authDir, 'seeded-data.json'), 'utf-8'))
  writeGlobalMocks({ seededData, storageState })
  console.log('Global mocks recorded')

  console.log('Global setup complete')
}

async function fetchJson(url: string, headers: Record<string, string>): Promise<unknown> {
  try {
    const res = await fetch(url, { headers })
    if (!res.ok) {
      console.warn(`Warning: ${url} returned ${res.status}`)
      return null
    }
    return res.json()
  } catch (e) {
    console.warn(`Warning: Failed to fetch ${url}:`, e)
    return null
  }
}

function extractItems(data: unknown, fields: string[]): Record<string, unknown>[] {
  if (!data) return []
  const items =
    Array.isArray(data)
      ? data
      : Array.isArray((data as any)?.data)
        ? (data as any).data
        : Array.isArray((data as any)?.data?.data)
          ? (data as any).data.data
          : []
  return items.map((item: any) => {
    const result: Record<string, unknown> = {}
    for (const field of fields) {
      result[field] = item[field]
    }
    return result
  })
}

async function waitForService(url: string, timeoutMs: number) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch {
      // not ready yet
    }
    await new Promise((r) => setTimeout(r, 1000))
  }
  throw new Error(`Service not ready after ${timeoutMs}ms: ${url}`)
}

export default globalSetup
