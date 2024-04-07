type ParseBoolean<T> = {
  [K in keyof T]: T[K] extends string & ('true' | 'false') ? boolean : T[K]
}
export function parseEnv(viteEnv: ImportMetaEnv) {
  const env = {} as ParseBoolean<ImportMetaEnv>

  for (const key in viteEnv) {
    env[key] = viteEnv[key] === 'true' ? true : viteEnv[key] === 'false' ? false : viteEnv[key]
  }

  return env
}
