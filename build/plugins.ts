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
import VueMacros from 'unplugin-vue-macros'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import MetaLayouts from 'vite-plugin-vue-meta-layouts'

export const src = fileURLToPath(new URL('/src', import.meta.url))
const getFilePath = (_path: string) => path.join(src, _path)
export function definePlugins() {
  return [
    VueRouter({
      routesFolder: 'src/views',
      dts: '../types/typed-router.d.ts',
    }),

    /**
     * 给 vue 添加宏 包括 defineOption
     * @link https://github.com/sxzz/unplugin-vue-macros
     */
    VueMacros.vite({
      plugins: {
        vue: vue({
          script: {
            defineModel: true,
          },
        }),
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
    MetaLayouts(),

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
      dts: '../types/auto-imports.d.ts',
    }),

    /**
     * 自动导入组件
     * @link   https://github.com/antfu/unplugin-vue-components
     */
    Components({
      resolvers: [TDesignResolver({ library: 'vue-next' })],
      dts: '../types/component.d.ts',
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
      dtsDir: '../types',
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
  ]
}
