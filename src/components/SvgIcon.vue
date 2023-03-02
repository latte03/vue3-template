<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color, width: w, height: h }">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup lang="ts">
// import { computed, h } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  w: {
    type: String,
    default: '24px'
  },
  h: {
    type: String,
    default: '24px'
  }
})
const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  if (props.name) return `svg-icon icon-${props.name}`
  return 'svg-icon'
})
</script>

<style scoped lang="less">
.svg-icon {
  /* 此属性为更改svg颜色属性设置 */
  width: 1em;
  height: 1em;
  overflow: hidden;

  /* vertical-align: -0.15em; */
  vertical-align: middle;
  fill: currentcolor;
}
</style>
