import { defineConfig } from 'vitest/config'
/**
 *  Vitest 单元测试配置
 * @link https://cn.vitest.dev/config
 */
export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts', '*/**/__tests__/**/*.ts'],
    environment: 'jsdom',
  },
})
