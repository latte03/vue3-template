/** 声明 vite 环境变量的类型（如果未声明则默认是 any） */
declare interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_API_URL: string
  readonly VITE_ROUTER_HISTORY: 'hash' | 'html5'
  readonly VITE_PUBLIC_PATH: string
  readonly VITE_DROP_CONSOLE: 'true' | 'false'
  readonly VITE_LEGAL_COMMENTS: 'true' | 'false'
}
