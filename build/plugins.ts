/// <reference types="vitest" />

import path from 'node:path'
import process from 'node:process'

import { fileURLToPath, URL } from 'node:url'
import { webUpdateNotice } from '@plugin-web-update-notification/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Compression from 'unplugin-compression/vite'
import Info from 'unplugin-info/vite'
import UnpluginSvgComponent from 'unplugin-svg-component/vite'
import TurboConsole from 'unplugin-turbo-console/vite'
import UnpluginUnused from 'unplugin-unused/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import VueDevtools from 'vite-plugin-vue-devtools'
import MetaLayouts from 'vite-plugin-vue-meta-layouts'
import tsconfigPaths from 'vite-tsconfig-paths'
import VueMacros from 'vue-macros'

export const src = fileURLToPath(new URL('../src', import.meta.url))
export const types = fileURLToPath(new URL('../types', import.meta.url))

const getFilePath = (_path: string) => path.join(src, _path)
const getTypesPath = (_path: string) => path.join(types, _path)

export function definePlugins() {
  return [
    VueRouter({
      routesFolder: 'src/views',
      // dts: '../types/typed-router.d.ts',
      dts: getTypesPath('./typed-router.d.ts'),
    }),

    /**
     * 给 vue 添加宏 包括 defineOption
     * @link https://github.com/sxzz/unplugin-vue-macros
     */
    VueMacros.vite({
      plugins: {
        vue: vue(),
        vueJsx: vueJsx(),
      },
    }),

    /**
     * 如果有需要可以打开
     * @link https://github.com/webfansplz/vite-plugin-vue-inspector
     */
    // Inspector(),

    /**
     * 因为原来的 vite-plugin-vue-layouts 在 layout 组件中修改css 热更新不生效，故而换成这个
     * @link https://github.com/dishait/vite-plugin-vue-meta-layouts
     */
    MetaLayouts({
      // 打开修复 https://github.com/JohnCampionJr/vite-plugin-vue-layouts/issues/134，默认为 false 关闭
      skipTopLevelRouteLayout: true,
    }),

    /**
     * Vue DevTools Next
     * @link https://github.com/vuejs/devtools-next#readme
     */
    VueDevtools(),

    /**
     * Unplugin Torbo Console 是一个通用型插件，旨在增强前端开发人员在使用 console 时的开发者体验(DX)
     * @link https://utc.yuy1n.io/guide/getting-started.html
     */

    TurboConsole({
      /* options here */
    }),

    /**
     * see unocss.config.ts for config
     * @link https://github.com/antfu/unocss
     */
    Unocss(),

    AutoImport({
      /*
       * targets to transform
       * .ts, .tsx, .js, .jsx
       */
      include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: ['vue', VueRouterAutoImports, 'vue/macros'],
      eslintrc: { enabled: true },
      resolvers: [TDesignResolver({ library: 'vue-next' })],
      dts: getTypesPath('./auto-imports.d.ts'),
    }),

    /**
     * 自动导入组件
     * @link   https://github.com/antfu/unplugin-vue-components
     */
    Components({
      dirs: getFilePath('./components'),
      resolvers: [TDesignResolver({ library: 'vue-next' })],
      dts: getTypesPath('./components.d.ts'),
    }),

    /**
     * svg组件自动导入
     */
    UnpluginSvgComponent({
      // 指定需要缓存的图标文件夹
      iconDir: getFilePath('icons'),
      dts: true,

      /**
       * 通常, 插件会把svg标签内的fill, stroke属性替换成currentColor,
       * 此属性会对每个svg路径进行正则匹配, 匹配成功的svg则不会替换currentColor, 而是保留原有的颜色.
       * preserveColor: getFilePath('icons/common'),
       */
      dtsDir: types,
      svgSpriteDomId: 'svg-id',

      /**
       * 给每个svg name加上前缀,使用时记得加上这个前缀
       */
      // prefix: 'icon',

      /**
       * 生成的组件名称
       */
      componentName: 'SvgIcon',
      componentStyle: 'width:1em;height:1em;fill: currentcolor;display: inline-block;',
      symbolIdFormatter: (svgName: string, prefix: string): string => {
        const nameArr = svgName.split('/')
        if (prefix) nameArr.unshift(prefix)
        return nameArr.join('-').replace(/\.svg$/, '')
      },

      /**
       * svgo 的优化参数
       * @link https://github.com/svg/svgo
       */
      optimizeOptions: undefined,
      scanStrategy: 'text',
      treeShaking: false,
    }),
    /**
     * Compress dist to zip, tar, taz
     * @link https://github.com/KeJunMao/unplugin-compression
     */
    Compression({
      adapter: 'zip',
      source: path.join('./', `dist-${process.env.npm_package_version}`),
      outDir: path.join('./'),
    }),

    /**
     * Give vite the ability to resolve imports using TypeScript's path mapping.
     * @link https://github.com/aleclarson/vite-tsconfig-paths
     */
    tsconfigPaths(),

    /**
     * Export build information as virutal module.
     * This plugin helps you add build timestamp / commit SHA / CI environment / package.json / ... to your application. So you can easily check whether the production version meets your expectations, or config your application.
     * @link https://github.com/yjl9903/unplugin-info
     */
    Info(),

    /**
     * Detect webpage updates and notify user to reload. support vite, umijs and webpack.
     * @link https://github.com/GreatAuk/plugin-web-update-notification
     */
    webUpdateNotice({
      locale: 'zh_CN',
      logVersion: true,
    }),

    /**
     * Check unused dependencies.
     * @link https://github.com/unplugin/unplugin-unused
     */
    UnpluginUnused(),
  ]
}
