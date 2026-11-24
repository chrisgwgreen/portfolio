import { defineConfig, devices } from '@playwright/test'

// Visual regression checks against the static export in out/ (run `npm run test:visual`)
export default defineConfig({
  testDir: 'tests/visual',
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{arg}{ext}',
  timeout: 60_000,
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      timeout: 20_000,
      // Springs can settle on a sub-pixel offset, anti-aliasing ~20 title pixels differently
      maxDiffPixels: 50
    }
  },
  use: { baseURL: 'http://localhost:4173' },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } }
    },
    {
      name: 'mobile',
      use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 } }
    }
  ],
  // serve applies clean URLs and 404.html the same way Firebase Hosting does
  webServer: {
    command: 'npx serve@14 out --listen 4173 --no-clipboard',
    url: 'http://localhost:4173',
    reuseExistingServer: true
  }
})
