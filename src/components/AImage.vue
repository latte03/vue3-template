<template>
  <img :src="imgSrc" />
</template>
<script lang="ts" setup>
type PropsType = {
  name: string
  extension?: '.jpg' | '.png'
}
const props = withDefaults(defineProps<PropsType>(), {
  extension: '.png'
})

const imgSrc = computed(
  () => new URL(`../assets/images/${props.name}${props.extension}`, import.meta.url).href
)
</script>
