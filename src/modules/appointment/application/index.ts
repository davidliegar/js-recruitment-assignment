import type { BookAppointment } from '../domain/appointment'
import {
  getWeeklySlots as getWeeklySlotsApi,
  getCurrentAppointment as getCurrentAppointmentApi,
  bookSlot as bookSlotApi
} from '../infrastructure/appointment'

/* A typical use case will handle the input validation, track analytics, error handling */

export function getWeeklySlots(dateInput: Date) {
  return getWeeklySlotsApi(dateInput)
}

export function getCurrentAppointment() {
  return getCurrentAppointmentApi()
}

export function bookSlot(form: BookAppointment) {
  return bookSlotApi(form)
}