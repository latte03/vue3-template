/// <reference types="vitest" />

import type { ConfigEnv, UserConfigExport } from 'vite'
import { loadEnv } from 'vite'

import { definePlugins, src } from './build/plugins'

/**
 * @link https://vitejs.dev/config/
 */
export default (configEnv: ConfigEnv): UserConfigExport => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv
  const { VITE_PUBLIC_PATH } = viteEnv

  return {
    /** 打包时根据实际情况修改 base */
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: { '@': src },
    },
    plugins: definePlugins(),
    server: {
      /** 是否开启 HTTPS */
      https: false,
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true,
      /** 跨域设置允许 */
      cors: true,
      fs: {
        strict: true,
      },
      proxy: {
        '/dev-env': {
          target: 'https://www.txwlsq.com',
          changeOrigin: true,
          secure: true,
          rewrite: path => {
            return path.replace(/^\/dev-env/, '')
          },
        },
      },
    },
    build: {
      outDir: `dist-${process.env.npm_package_version}-${new Date().getTime()}`,
      /** 消除打包大小超过 500kb 警告 */
      chunkSizeWarningLimit: 2000,
      /** Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效 */
      minify: 'terser',
      /** 在打包代码时移除 console.log、debugger 和 注释 */
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ['console.log'],
        },
        format: {
          /** 删除注释 */
          comments: false,
        },
      },
      /** 打包后静态资源目录 */
      assetsDir: 'static',
      sourcemap: true,
    },
    /**
     *  Vitest 单元测试配置
     * @link https://cn.vitest.dev/config
     */
    test: {
      include: ['tests/**/*.test.ts', '*/**/__tests__/**/*.ts'],
      environment: 'jsdom',
    },
  }
}
