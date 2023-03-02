import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import unocss from 'unocss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import VueRouter from 'unplugin-vue-router/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Layouts from 'vite-plugin-vue-layouts'
import Inspector from 'unplugin-vue-inspector/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Pages({ dirs: 'src/views', extensions: ['vue'] }),
    VueRouter({
      routesFolder: 'src/views'
    }),

    // https://github.com/sxzz/unplugin-vue-macros
    VueMacros({
      plugins: {
        vue: vue(),
        vueJsx: vueJsx() // if needed
      }
    }),

    // https://github.com/webfansplz/vite-plugin-vue-inspector
    Inspector(),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    unocss(),

    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: [
        'vue',
        // 'vue-router',
        VueRouterAutoImports,
        'vue/macros'
      ],
      eslintrc: {
        enabled: true // <-- this
      },
      resolvers: [
        TDesignResolver({
          library: 'vue-next'
        })
      ],
      dts: true // or a custom path
    }),
    Components({
      resolvers: [
        TDesignResolver({
          library: 'vue-next'
        })
      ],
      dts: true
    }),

    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: '__svg__icons__dom__'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
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
    sourcemap: true
  }
})
