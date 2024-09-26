import { isDate } from 'date-fns'

export type Appointment = {
  doctorId: string
  doctorName: string
  start: Date
  end: Date
}

export type BookAppointment = {
  start: Date
  end: Date
  comments: string
  patient : {
    name : string
    lastName : string
    email : string
    phone : string
  }
}

const isValidPatient = (payload: any): payload is BookAppointment['patient'] => {
  return payload.name
    && payload.lastName
    && payload.email
    && payload.phone
}

export const isAValidBookAppointment = (payload: Record<string, unknown>): payload is BookAppointment => {
  const isValid = isDate(payload.start)
    && isDate(payload.end)
    && isValidPatient(payload.patient)
  return isValid
}