<template>
  <button 
    class="doc-button"
    :class="{
      'with-icon': icon,
      disabled,
      [variant]: true
    }"
    @click="emits('on-click')"
  >
    <Icon 
      v-if="icon" 
      class="icon" 
      :icon="icon" 
      data-testid="icon"
    />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

const {
  icon,
  variant = 'primary',
  disabled = false
} = defineProps<{
  icon?: string
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}>()

const emits = defineEmits<{
  'on-click': [void]
}>() 
</script>

<style lang="postcss">
.doc-button {
  background: var(--bg);
  color: var(--color);
  border: 1px solid var(--color-background-primary-strong);
  border-radius: var(--radius-md);
  display: flex;
  place-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 8px 16px;

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &.primary {
    --bg: var(--color-background-primary);
    --bg-hover: var(--color-background-primary-strong);
    --color: var(--color-color-primary);

    &:hover {
      color: var(--vt-c-white);
    }
  }

  &.secondary {
    --bg: var(--color-background);
    --bg-hover: var(--color-background-soft);
    --color: var(--color-color-primary);
  }

  &:hover {
    background: var(--bg-hover)
  }

  &.with-icon {
    padding: 0;
    width: 32px;
    border-radius: 999px;
    height: 32px;
  }

  & .icon {
    width: 24px;
    height: 24px;
  }
}
</style>