/// <reference types="vitest" />

import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnpluginSvgComponent from 'unplugin-svg-component/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import type { ConfigEnv, UserConfigExport } from 'vite'
import { loadEnv } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'
// import Inspector from 'unplugin-vue-inspector/vite'

const src = fileURLToPath(new URL('./src', import.meta.url))
const getFilePath = (_path: string) => {
  return path.join(src, _path)
}
// https://vitejs.dev/config/
export default (configEnv: ConfigEnv): UserConfigExport => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv
  const { VITE_PUBLIC_PATH } = viteEnv
  return {
    /** 打包时根据实际情况修改 base */
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: { '@': src }
    },
    plugins: [
      // Pages({ dirs: 'src/views', extensions: ['vue'] }),
      VueRouter({
        routesFolder: 'src/views',
        dts: './types/typed-router.d.ts'
      }),

      // https://github.com/sxzz/unplugin-vue-macros
      // 给 vue 添加魔法 包括 defineOption
      VueMacros({
        plugins: {
          vue: vue(),
          vueJsx: vueJsx() // if needed
        }
      }),

      // https://github.com/webfansplz/vite-plugin-vue-inspector
      // 如果有需要可以打开
      // Inspector(),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),

      AutoImport({
        // targets to transform
        // .ts, .tsx, .js, .jsx
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        imports: ['vue', VueRouterAutoImports, 'vue/macros'],
        eslintrc: { enabled: true },
        resolvers: [TDesignResolver({ library: 'vue-next' })],
        dts: './types/auto-imports.d.ts'
      }),

      // auto component
      Components({
        resolvers: [TDesignResolver({ library: 'vue-next' })],
        dts: './types/component.d.ts'
      }),

      // svg icon sprite
      UnpluginSvgComponent({
        // 指定需要缓存的图标文件夹
        iconDir: getFilePath('icons'),
        dts: true,
        // 通常, 插件会把svg标签内的fill, stroke属性替换成currentColor,
        // 此属性会对每个svg路径进行正则匹配, 匹配成功的svg则不会替换currentColor, 而是保留原有的颜色.
        preserveColor: getFilePath('icons/common'),
        dtsDir: './types',
        svgSpriteDomId: 'svg-id',
        // 给每个svg name加上前缀,使用时记得加上这个前缀
        // prefix: 'icon',
        // 生成的组件名称
        componentName: 'SvgIcon',
        componentStyle: 'width:1em;height:1em;fill: currentcolor;display: inline-block;',
        symbolIdFormatter: (svgName: string, prefix: string): string => {
          const nameArr = svgName.split('/')
          if (prefix) nameArr.unshift(prefix)
          return nameArr.join('-').replace(/\.svg$/, '')
        },
        // 	svgo 的优化参数 https://github.com/svg/svgo
        optimizeOptions: undefined
      })
    ],
    server: {
      /** 是否开启 HTTPS */
      https: false,
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true,
      /** 跨域设置允许 */
      cors: true,
      fs: {
        strict: true
      },
      proxy: {
        '/dev-env': {
          target: 'https://www.txwlsq.com',
          changeOrigin: true,
          secure: true,
          rewrite: path => {
            return path.replace(/^\/dev-env/, '')
          }
        }
      }
    },
    build: {
      outDir: `dist-${new Date().getTime()}`,
      /** 消除打包大小超过 500kb 警告 */
      chunkSizeWarningLimit: 2000,
      /** Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效 */
      minify: 'terser',
      /** 在打包代码时移除 console.log、debugger 和 注释 */
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ['console.log']
        },
        format: {
          /** 删除注释 */
          comments: false
        }
      },
      /** 打包后静态资源目录 */
      assetsDir: 'static',
      sourcemap: true
    },
    /** Vitest 单元测试配置：https://cn.vitest.dev/config */
    test: {
      include: ['tests/**/*.test.ts'],
      environment: 'jsdom'
    }
  }
}
