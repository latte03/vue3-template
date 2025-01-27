type ParseBoolean<T> = {
  [K in keyof T]: T[K] extends string & ('true' | 'false') ? boolean : T[K]
}

const keywordsMap = {
  true: true,
  false: false,
  undefined,
  null: null,
}
export function parseEnv(viteEnv: ImportMetaEnv) {
  const env: ParseBoolean<ImportMetaEnv> = {} as unknown as ParseBoolean<ImportMetaEnv>

  for (const key in viteEnv) {
    if (isKeywords(viteEnv[key])) {
      env[key] = keywordsMap[viteEnv[key]]
    } else {
      env[key] = viteEnv[key]
    }
  }

  return env
}

function isKeywords(key: string): key is keyof typeof keywordsMap {
  return Object.keys(keywordsMap).includes(key)
}
