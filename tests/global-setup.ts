import { chromium, type FullConfig } from '@playwright/test'
import { seedTestData } from './e2e/fixtures/seed-data'
import { API_URL } from './e2e/fixtures/test-constants'
import fs from 'fs'
import path from 'path'

async function globalSetup(config: FullConfig) {
  // 1. Wait for backend to be ready
  console.log('Waiting for backend...')
  await waitForBackend(`${API_URL}/`, 60_000)
  console.log('Backend is ready')

  // 2. Seed test data
  console.log('Seeding test data...')
  const seededData = await seedTestData()
  console.log('Test data seeded')

  // 3. Save auth state via browser (to get proper cookies for Playwright)
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  // Navigate to frontend to set cookie domain correctly
  const frontendURL = config.projects[0].use.baseURL || 'http://localhost:3001'
  await page.goto(frontendURL, { waitUntil: 'domcontentloaded', timeout: 30_000 })

  // Set cookies from API login
  await context.addCookies(
    seededData.cookies.map((c) => ({
      ...c,
      domain: new URL(frontendURL).hostname,
    }))
  )

  // Save storage state
  const authDir = path.join(__dirname, '.auth')
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true })
  await context.storageState({ path: path.join(authDir, 'user.json') })

  // Save seeded IDs for tests to use
  fs.writeFileSync(
    path.join(authDir, 'seeded-data.json'),
    JSON.stringify(seededData, null, 2)
  )

  await browser.close()
  console.log('Global setup complete')
}

async function waitForBackend(url: string, timeoutMs: number) {
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
  throw new Error(`Backend not ready after ${timeoutMs}ms`)
}

export default globalSetup
