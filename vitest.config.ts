import { fileURLToPath } from 'node:url'
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        domEnvironment: 'happy-dom',
      },
    },
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html', 'json-summary'],
      reportsDirectory: fileURLToPath(new URL('./coverage', import.meta.url)),
      all: false, // Only include files that are imported in tests
      include: ['**/*.vue', '**/*.ts'],
      exclude: [
        '**/node_modules/**',
        '**/test/**',
        '**/*.d.ts',
        '**/*.config.*',
        '**/.nuxt/**',
        '**/plugins/**',
        '**/layouts/**',
        '**/pages/**',
      ],
    },
  },
})
