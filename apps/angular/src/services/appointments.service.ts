import {
  Appointment,
  getCurrentAppointment,
} from "@book-appointment/modules"
import { CommonService } from './common.service';
import { Injectable } from "@angular/core";

interface AppointmentError {
  type: 'appointmentError',
  message: 'there is an error with your appointment'
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService extends CommonService<Appointment, AppointmentError>{
  getCurrentAppointment() {
    this.execute(getCurrentAppointment, undefined)
  }
}
