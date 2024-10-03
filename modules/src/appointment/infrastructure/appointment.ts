import { toDate, format, addDays, previousMonday, set, isMonday } from 'date-fns'
import { api } from "@book-appointment/modules"
import type { GetWeeklySlotsApi } from './appointmentTypes'
import type { WeekSlots } from '../domain/weekSlots'
import type { Appointment, BookAppointment } from '../domain/appointment'

let mockStartDate = set(new Date(), { hours: 10, minutes: 10 })
let mockEndDate = set(new Date(), { hours: 10, minutes: 10 })

export const getCurrentAppointment = (): Promise<Appointment> => {
  return Promise.resolve({
    doctorId: '1',
    doctorName: 'Dr Simeon Molas',
    start: mockStartDate,
    end: mockEndDate
  })
}

export const getWeeklySlots = async (dateInput: Date): Promise<WeekSlots> => {
  let prevMonday: Date

  if (isMonday(dateInput)) {
    prevMonday = dateInput
  } else {
    prevMonday = previousMonday(dateInput)
  }

  const defaultCalendar = {
    [format(prevMonday, 'yyyy-MM-dd')]: [],
    [format(addDays(prevMonday, 1), 'yyyy-MM-dd')]: [],
    [format(addDays(prevMonday, 2), 'yyyy-MM-dd')]: [],
    [format(addDays(prevMonday, 3), 'yyyy-MM-dd')]: [],
    [format(addDays(prevMonday, 4), 'yyyy-MM-dd')]: [],
    [format(addDays(prevMonday, 5), 'yyyy-MM-dd')]: [],
    [format(addDays(prevMonday, 6), 'yyyy-MM-dd')]: [],
  }

  const info = await api.get<GetWeeklySlotsApi>(`availability/GetWeeklySlots/${format(prevMonday, 'yyyyMMdd')}`)
  
  const infoMapped = info.map(slot => ({
    start: toDate(slot.Start),
    end: toDate(slot.End)
  }))

  return {
    ...defaultCalendar,
    ...Object.groupBy(infoMapped, (slot) => {
      return format(slot.start, 'yyyy-MM-dd')
    })
  }
}

export const bookSlot = (form: BookAppointment): Promise<void> => {
  mockStartDate = form.start
  mockEndDate = form.end

  return api.post('availability/BookSlot', {
    Start: form.start,
    End: form.end,
    Comments: form.comments,
    Patient : {
      Name : form.patient.name,
      SecondName : form.patient.lastName,
      Email : form.patient.email,
      Phone : form.patient.phone
    }
  })
}