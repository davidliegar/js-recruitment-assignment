<template>
  <div 
    class="day"
  >
    <p>{{ format(props.date, 'EE') }}</p>
    <p>{{ format(props.date, 'dd MMM') }}</p>

    <slot-time-button
      v-for="(slot, index) in daySchedule"
      :key="`${props.date}-${index}`"
      class="slot-time"
      :slot-time="slot"
      @on-click="emit('on-click', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns"
import SlotTimeButton from '@/components/SlotTimeButton.vue'
import type { SlotTime } from "@/modules/appointment"

const props = defineProps<{
  date: string,
  daySchedule: SlotTime[]
}>()

const emit = defineEmits<{
  'on-click': [SlotTime]
}>()

</script>

<style lang="postcss" scoped>
.day {
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: max-content;
  gap: 16px;
  width: 100%;
}
</style>