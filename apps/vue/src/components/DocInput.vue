<template>
  <div class="input-wrapper">
    <label v-if="props.label" :for="inputId">{{ props.label }}</label>
    <input
      :id="inputId"
      :type="props.type"
      v-model="model"
      :placeholder="placeholder"
      class="input"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  type?: string
  placeholder?: string
  label?: string
}>()

const model = defineModel<string>()

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)
</script>

<style scoped lang="postcss">
.input-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  & .input {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid var(--color-background-primary);
    outline: none;
  }
}
</style>
