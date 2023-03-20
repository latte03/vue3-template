<template>
  <div class="flex item relative">
    <i class="flex">
      <slot name="icon" />
    </i>
    <div class="details">
      <h3>
        <slot name="heading" />
      </h3>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 2rem;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  place-content: center;
  place-items: center;
  width: 32px;
  height: 32px;
  color: var(--color-text);
}

h3 {
  margin-bottom: 0.4rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-heading);
}
</style>
