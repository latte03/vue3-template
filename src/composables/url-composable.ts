import { computed } from 'vue'

interface AssetsImageUrlOptions {
  extension: '.jpg' | '.png' | '.svg'
}

export const useAssetsImageURL = (imageName: string, props?: AssetsImageUrlOptions) => {
  return computed(
    () =>
      new URL(`../assets/images/${imageName}${props?.extension || '.png'}`, import.meta.url).href
  )
}
