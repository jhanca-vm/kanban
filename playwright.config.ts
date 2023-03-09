import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: 'tests',
  webServer: { command: 'pnpm build && pnpm preview', port: 8000 }
})
