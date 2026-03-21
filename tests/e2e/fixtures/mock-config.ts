import fs from 'fs'
import path from 'path'

import { type Page } from '@playwright/test'

/** Toggle: true = record from real backend, false = replay from .mocks.json */
export const RECORD_MODE = false

const MOCKS_DIR = path.join(__dirname, 'mocks')

type MockEntry = { status: number; body: unknown }
type MockStore = Record<string, MockEntry | MockEntry[]>

function buildKey(method: string, pathname: string, search?: string): string {
  return search ? `${method} ${pathname}${search}` : `${method} ${pathname}`
}

/**
 * Manages recording and replaying API responses for a single spec file.
 * WARNING: uses module-level _activeMocker — requires workers: 1
 *
 * Usage in spec:
 *   const mocker = new MockManager('order-services')
 *   test.beforeEach(async ({ page }) => { await mocker.setupPage(page) })
 *   test.beforeAll(async () => { setActiveMocker(mocker) })
 *   test.afterAll(async () => { await mocker.teardown(); setActiveMocker(null) })
 */
export class MockManager {
  private mockFilePath: string
  private store: MockStore = {}
  private storeLoaded = false
  private replayCounters: Record<string, number> = {}
  private recordedEntries: Map<string, MockEntry[]> = new Map()

  constructor(specName: string) {
    this.mockFilePath = path.join(MOCKS_DIR, `${specName}.mocks.json`)
  }

  /** Call in beforeEach — each test gets a fresh page in Playwright */
  async setupPage(page: Page) {
    if (RECORD_MODE) {
      page.on('response', async (response) => {
        const url = new URL(response.url())
        if (!url.pathname.startsWith('/api/')) return
        const key = buildKey(response.request().method(), url.pathname, url.search || undefined)
        try {
          const body = await response.json().catch(() => null)
          this.recordEntry(key, { status: response.status(), body })
        } catch {
          // skip non-JSON responses
        }
      })
    } else {
      this.loadStore()
      await page.route('**/api/**', (route) => {
        const url = new URL(route.request().url())
        const key = buildKey(route.request().method(), url.pathname, url.search || undefined)
        const entry = this.getNextEntry(key)
        if (entry) {
          route.fulfill({
            status: entry.status,
            contentType: 'application/json',
            body: JSON.stringify(entry.body),
          })
        } else {
          // Return empty response for background requests not captured during recording
          route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ data: [] }),
          })
        }
      })
    }
  }

  /** Record an API helper response (called from apiCall in record mode) */
  recordEntry(key: string, entry: MockEntry) {
    const existing = this.recordedEntries.get(key) || []
    existing.push(entry)
    this.recordedEntries.set(key, existing)
  }

  /** Call in afterAll — writes recorded data to disk in record mode */
  teardown() {
    if (!RECORD_MODE) return
    const store: MockStore = {}
    for (const [key, entries] of this.recordedEntries) {
      store[key] = entries.length === 1 ? entries[0] : entries
    }
    fs.writeFileSync(this.mockFilePath, JSON.stringify(store, null, 2))
    console.log(`[MockManager] Written: ${this.mockFilePath}`)
  }

  /** For API helpers — get a mock response without page.route */
  getMockResponse(method: string, apiPath: string): MockEntry | null {
    this.loadStore()
    const key = buildKey(method, apiPath)
    return this.getNextEntry(key)
  }

  private loadStore() {
    if (this.storeLoaded) return
    if (!fs.existsSync(this.mockFilePath)) {
      console.warn(`[MockManager] Mock file not found: ${this.mockFilePath}`)
      this.storeLoaded = true
      return
    }
    this.store = JSON.parse(fs.readFileSync(this.mockFilePath, 'utf-8'))
    this.storeLoaded = true
  }

  private getNextEntry(key: string): MockEntry | null {
    const data = this.store[key]
    if (!data) return null
    if (Array.isArray(data)) {
      const idx = this.replayCounters[key] || 0
      this.replayCounters[key] = idx + 1
      return data[idx] ?? data[data.length - 1]
    }
    return data
  }
}

/**
 * For global-setup: read/write global mocks (auth, org, seed data).
 * Separate from MockManager because global-setup runs outside of Page context.
 */
export function getGlobalMockPath(): string {
  return path.join(MOCKS_DIR, 'global-setup.mocks.json')
}

export function readGlobalMocks(): Record<string, unknown> | null {
  const p = getGlobalMockPath()
  if (!fs.existsSync(p)) return null
  return JSON.parse(fs.readFileSync(p, 'utf-8'))
}

export function writeGlobalMocks(data: Record<string, unknown>) {
  if (!fs.existsSync(MOCKS_DIR)) fs.mkdirSync(MOCKS_DIR, { recursive: true })
  fs.writeFileSync(getGlobalMockPath(), JSON.stringify(data, null, 2))
}
