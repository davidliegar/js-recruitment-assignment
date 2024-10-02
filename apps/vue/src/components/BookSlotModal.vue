<template>
  <dialog 
    class="dialog"
    ref="modal"
  >
    <doc-input 
      label="First name"
      v-model="form.name"
    />
    <doc-input 
      label="Last name"
      v-model="form.lastName"
    />
    <doc-input 
      label="Email"
      v-model="form.email"
    />

    <doc-input 
      label="Phone"
      v-model="form.phone"
    />

    <doc-input 
      label="Comments"
      v-model="form.comments"
    />

    <div class="buttons-wrapper">
      <doc-button variant="secondary" @click="emit('on-close')">Close</doc-button>
      <doc-button
        :disabled="isDisabled"
        data-testid="cta"
        @click="emit('on-save', form)"
      >
        Book
      </doc-button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { watchEffect, useTemplateRef, reactive, computed } from 'vue'
import DocInput from './DocInput.vue';
import DocButton from './DocButton.vue';

const modal = useTemplateRef<HTMLDialogElement>('modal')
const props = defineProps<{
  open?: boolean
}>()

const emit = defineEmits<{
  'on-close': [],
  'on-save': [BookSlotForm]
}>()

export interface BookSlotForm {
  name?: string
  lastName?: string
  email?: string
  phone?: string
  comments?: string
}

const form = reactive<BookSlotForm>({})

const isDisabled = computed(() => {
  return !(form.name && form.lastName && form.email && form.phone && form.lastName && form.comments)
})

watchEffect(() => {
  if (props.open) {
    modal.value?.showModal()
  } else {
    modal.value?.close()
  }
})


</script>

<style lang="postcss" scoped>
.dialog {
  border: none;
  border-radius: var(--radius-md);
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 300px;
  text-align: center;
  position: absolute;
  inset: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;

  &::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }
}

.buttons-wrapper {
  display: flex;
  justify-content: space-around;
  gap: 8px;
}

</style>