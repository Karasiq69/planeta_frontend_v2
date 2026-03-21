import { defineConfig, devices } from '@playwright/test'

const isDocker = process.env.TEST_ENV === 'docker'

export default defineConfig({
  testDir: './e2e',
  workers: 1,
  retries: 1,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: isDocker ? 'http://localhost:3001' : 'http://localhost:3000',
    storageState: 'tests/.auth/user.json',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  globalSetup: require.resolve('./global-setup'),
  globalTeardown: require.resolve('./global-teardown'),
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
