import process from 'node:process'

import { loadEnv, type ConfigEnv, type UserConfigExport } from 'vite'

import { parseEnv } from './build/parse-env.ts'
import { definePlugins, src } from './build/plugins.ts'
import pkg from './package.json' with { type: 'json' }
/**
 * @link https://vitejs.dev/config/
 */
function defineViteConfig(configEnv: ConfigEnv): UserConfigExport {
  const viteEnv = parseEnv(loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv)
  console.log(viteEnv)

  const { VITE_PUBLIC_PATH, VITE_API_URL, VITE_DROP_CONSOLE, VITE_LEGAL_COMMENTS } = viteEnv

  return {
    /** 打包时根据实际情况修改 base */
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: { '@': src },
      /** Vite 8 原生支持 tsconfig 的 paths 映射，无需 vite-tsconfig-paths */
      tsconfigPaths: true,
    },
    plugins: definePlugins(),
    define: {
      __AG__VERSION__: JSON.stringify(pkg.version),
    },
    server: {
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true,
      /** 跨域设置允许 */
      cors: true,
      proxy: {
        '/dev-env': {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: true,
          rewrite: path => {
            return path.replace(/^\/dev-env/, '')
          },
        },
      },
    },

    build: {
      outDir: `dist-${process.env.npm_package_version}`,
      /** 消除打包大小超过 500kb 警告 */
      chunkSizeWarningLimit: 2000,
      /** 需要移除 console 时改用 terser，oxc 不提供 drop 能力 */
      minify: VITE_DROP_CONSOLE ? 'terser' : 'oxc',
      /** 在打包代码时移除 console.log、debugger 和 注释 */
      terserOptions: {
        compress: {
          drop_console: VITE_DROP_CONSOLE,
          drop_debugger: VITE_DROP_CONSOLE,
        },
        format: { comments: VITE_LEGAL_COMMENTS ? false : 'some' },
      },

      /** 打包后静态资源目录 */
      assetsDir: 'static',
      sourcemap: true,
    },
  }
}

export default defineViteConfig
