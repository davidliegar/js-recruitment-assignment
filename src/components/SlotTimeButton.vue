<template>
  <div
    class="slot-time"
    :class="{ disabled: isDisabled }"
    @click="emit('on-click', props.slotTime)"
  >
    {{ format(props.slotTime.start, 'HH:mm') }}
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { format, compareAsc, setHours } from 'date-fns'
import type { SlotTime } from "@/modules/appointment"

const props = defineProps<{
  slotTime: SlotTime
}>()

const emit = defineEmits<{
  'on-click': [SlotTime]
}>()

const isDisabled = computed(() => {
  return compareAsc(props.slotTime.start, setHours(new Date(), 14)) === -1
})
</script>

<style lang="postcss" scoped>
.slot-time {
  padding: 4px;
  background: var(--color-background-primary);
  color: var(--color-color-primary);
  border-radius: var(--radius-xs);
  text-align: center;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease-in-out; 

  &:hover {
    background: var(--color-background-primary-strong);
  }

  &.disabled {
    background: var(--color-background);
    color: var(--color-text-disabled);
    text-decoration: line-through;
    pointer-events: none;
  }
}
</style>