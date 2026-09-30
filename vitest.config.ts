import { fileURLToPath, URL } from 'node:url'

import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'
/**
 *  Vitest 单元测试配置
 * @link https://cn.vitest.dev/config
 */
const src = fileURLToPath(new URL('src', import.meta.url))
export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts', '*/**/__tests__/**/*.ts'],
    environment: 'jsdom',
  },
  resolve: {
    alias: { '@': src },
    tsconfigPaths: true,
  },
  plugins: [Vue()],
})
