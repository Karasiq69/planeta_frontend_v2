import type { FullConfig } from '@playwright/test'

async function globalTeardown(config: FullConfig) {
  console.log('Global teardown complete (Docker Compose cleanup is manual)')
}

export default globalTeardown
