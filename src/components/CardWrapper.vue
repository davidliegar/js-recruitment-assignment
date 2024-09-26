<template>
  <div 
    class="card-wrapper"
    :class="{ expandable: props.expandFrom, expanded: seeMore }"
  >
    <slot />

    <button 
      v-if="props.expandFrom"
      class="see-more"
      @click="seeMore = !seeMore"
    >
      <slot v-if="seeMore" name="see-less"/>
      <slot v-else name="see-more"/>
      <Icon class="icon" icon="mdi:chevron-down" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue'

const props = defineProps<{
  expandFrom?: string
}>()

const seeMore = ref(false)
</script>

<style lang="postcss" scoped>
.card-wrapper {
  background: var(--color-background);
  border-radius: var(--radius-md);
  padding: 16px;
  position: relative;

  &.expandable {
    max-height: v-bind(props.expandFrom);
    overflow: hidden;
    transition: max-height 500ms ease-in-out;
  }

  &.expanded {
    max-height: 9999px;

    & .icon {
      transform: rotateZ(180deg);
    }
  }

  & .see-more {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 8px 0 32px;
    background: var(--color-background);
    color: var(--color-color-primary);
    border: none;
    border-block-start: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    & .icon {
      width: 1.5rem;
      height: 1.5rem;
      transition: transform 200ms ease-in;
    }
  }
}
</style>