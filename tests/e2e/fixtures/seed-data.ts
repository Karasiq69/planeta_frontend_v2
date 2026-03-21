import { request } from '@playwright/test'
import { API_URL, TEST_USER, TEST_CLIENTS, TEST_SERVICES, TEST_PRODUCTS, TEST_MECHANICS } from './test-constants'

export interface SeededData {
  cookies: { name: string; value: string; domain: string; path: string }[]
  organizationId: number
  clientIds: number[]
  serviceIds: number[]
  productIds: number[]
  mechanicIds: number[]
  warehouseId: number
  cashRegisterId: number
}

export async function seedTestData(): Promise<SeededData> {
  const apiContext = await request.newContext({ baseURL: API_URL })

  // 1. Register test user (or skip if exists)
  const registerRes = await apiContext.post('/api/auth/register', {
    data: {
      email: TEST_USER.email,
      password: TEST_USER.password,
      username: TEST_USER.username,
    },
  })

  if (registerRes.status() !== 201 && registerRes.status() !== 409) {
    throw new Error(`Register failed: ${registerRes.status()} ${await registerRes.text()}`)
  }

  // Login to get cookies
  const loginRes = await apiContext.post('/api/auth/login', {
    data: { email: TEST_USER.email, password: TEST_USER.password },
  })
  if (!loginRes.ok()) throw new Error(`Login failed: ${loginRes.status()} ${await loginRes.text()}`)

  // Use headersArray() to correctly parse multiple set-cookie headers
  const setCookieHeaders = loginRes.headersArray().filter((h) => h.name.toLowerCase() === 'set-cookie')
  const cookies: SeededData['cookies'] = setCookieHeaders.map((h) => {
    const [nameValue] = h.value.split(';')
    const [name, ...valueParts] = nameValue.trim().split('=')
    return { name: name.trim(), value: valueParts.join('=').trim(), domain: 'localhost', path: '/' }
  })

  // Create authenticated context (without org header initially)
  const authContext = await request.newContext({
    baseURL: API_URL,
    extraHTTPHeaders: {
      Cookie: cookies.map((c) => `${c.name}=${c.value}`).join('; '),
    },
  })

  // 2. Create organization
  const orgRes = await authContext.post('/api/organization', {
    data: { name: 'Тест Автосервис', address: 'ул. Тестовая, 1' },
  })
  const org = await orgRes.json()
  const organizationId = org.id || org.data?.id

  // Dispose old context, create new one with x-organization-id
  await authContext.dispose()
  const orgAuthContext = await request.newContext({
    baseURL: API_URL,
    extraHTTPHeaders: {
      Cookie: cookies.map((c) => `${c.name}=${c.value}`).join('; '),
      'x-organization-id': organizationId.toString(),
    },
  })

  // 3. Seed clients
  const clientIds: number[] = []
  for (const client of Object.values(TEST_CLIENTS)) {
    const res = await orgAuthContext.post('/api/clients', { data: client })
    if (res.ok()) {
      const data = await res.json()
      clientIds.push(data.id || data.data?.id)
    }
  }

  // 4. Seed services
  const serviceIds: number[] = []
  for (const service of TEST_SERVICES) {
    const res = await orgAuthContext.post('/api/services', { data: service })
    if (res.ok()) {
      const data = await res.json()
      serviceIds.push(data.id || data.data?.id)
    }
  }

  // 5. Seed products
  const productIds: number[] = []
  for (const product of TEST_PRODUCTS) {
    const res = await orgAuthContext.post('/api/products', { data: product })
    if (res.ok()) {
      const data = await res.json()
      productIds.push(data.id || data.data?.id)
    }
  }

  // 6. Seed employees/mechanics
  const mechanicIds: number[] = []
  for (const mechanic of TEST_MECHANICS) {
    const res = await orgAuthContext.post('/api/employees', { data: mechanic })
    if (res.ok()) {
      const data = await res.json()
      mechanicIds.push(data.id || data.data?.id)
    }
  }

  // 7. Seed warehouse
  const whRes = await orgAuthContext.post('/api/warehouse', {
    data: { name: 'Тест Склад', type: 'main' },
  })
  const warehouse = await whRes.json()
  const warehouseId = warehouse.id || warehouse.data?.id

  // 8. Seed cash register
  const crRes = await orgAuthContext.post('/api/cash-registers', {
    data: { name: 'Тест Касса', type: 'physical' },
  })
  const cashRegister = await crRes.json()
  const cashRegisterId = cashRegister.id || cashRegister.data?.id

  await apiContext.dispose()
  await orgAuthContext.dispose()

  return {
    cookies,
    organizationId,
    clientIds,
    serviceIds,
    productIds,
    mechanicIds,
    warehouseId,
    cashRegisterId,
  }
}
