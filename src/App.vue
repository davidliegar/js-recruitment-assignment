
<template>
  <section>
      <h2>
        Confirm your appointment with 
        <strong>{{ data.appointment?.doctorName }}</strong>
      </h2>

      <card-wrapper
        v-if="data.appointment"
        class="current-appointment"
      >
        <Icon class="icon" icon="radix-icons:calendar" />
        <p class="paragraph">{{ format(data.appointment.start, "'On' EEEE dd, LLL yyyy 'at' HH:mm") }}</p>
      </card-wrapper>
  </section>

  <section class="unexpected-situation">
      <h2>
        <strong>You have an unexpected situation?</strong>  
      </h2>
      <p class="paragraph">You can change the appointment for when it suits you better</p>
  </section>

  <card-wrapper
    v-if="data.weekSlots"
    class="calendar"
    expand-from="500px"
  >
    <icon-button 
      icon="material-symbols:chevron-left" 
      @click="getPrevSchedule"
    />
    
    <day-schedule 
      v-for="(info, day) in data.weekSlots"
      class="day"
      :key="day"
      :date="day"
      :day-schedule="info"
      @on-click="openModal"
    />

    <icon-button 
      icon="material-symbols:chevron-right" 
      @click="getNextSchedule"
    />

    <template #see-more>
      See more hours
    </template>

    <template #see-less>
      See less hours
    </template>
  </card-wrapper>

  <book-slot-modal 
    :open="data.openModal"
    @on-close="data.openModal = false"
    @on-save="saveForm"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { addWeeks, format } from "date-fns"
import { Icon } from '@iconify/vue'
import BookSlotModal, { type BookSlotForm } from '@/components/BookSlotModal.vue'
import type { DeepPartial } from '@/types/deepPartial'
import {
  getWeeklySlots,
  getCurrentAppointment,
  bookSlot,
  isAValidBookAppointment,
  type Appointment,
  type WeekSlots,
  type BookAppointment,
  type SlotTime
} from "@/modules/appointment"

import IconButton from '@/components/DocButton.vue'
import DaySchedule from '@/components/DaySchedule.vue'
import CardWrapper from '@/components/CardWrapper.vue'

interface Data {
  weekSlots?: WeekSlots
  appointment?: Appointment
  today: Date
  currentDayShowing: Date
  openModal?: boolean
  form: DeepPartial<BookAppointment>
}

const data = reactive<Data>({
  today: new Date(),
  currentDayShowing: new Date(),
  form: {}
})

async function getNextSchedule() {
  data.currentDayShowing = addWeeks(data.currentDayShowing, 1)
  data.weekSlots = await getWeeklySlots(data.currentDayShowing)
}

async function getPrevSchedule() {
  data.currentDayShowing = addWeeks(data.currentDayShowing, -1)
  data.weekSlots = await getWeeklySlots(data.currentDayShowing)
}

async function created() {
  data.weekSlots = await getWeeklySlots(data.today)
  data.appointment = await getCurrentAppointment()
}

function openModal (slot: SlotTime) {
  data.form.start = slot.start
  data.form.end = slot.end
  data.openModal = true
}

async function saveForm({ comments, ...patient }: BookSlotForm) {
  data.form.comments = comments
  data.form.patient = patient
  if (isAValidBookAppointment(data.form)) {
    try {
      await bookSlot(data.form)
    } finally {
      data.openModal = false
    }
  }

  data.appointment = await getCurrentAppointment()
}

created()
</script>

<style lang="postcss" scoped>
strong {
  font-weight: 700
}

.calendar {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  padding: 32px;
  text-align: center;
  justify-items: center;
  margin: 2rem 0;
}

.current-appointment {
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 2rem 0;

  & .icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  & .paragraph {
    font-weight: 600;
  }
}

.unexpected-situation {
  & .paragraph {
    font-size: 1.4rem;
  }
}
</style>
