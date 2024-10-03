import {
  Appointment,
  getCurrentAppointment,
} from "@book-appointment/modules"
import { CommonService } from './common.service';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService extends CommonService<Appointment>{
  getCurrentAppointment() {
    this.execute(getCurrentAppointment, undefined)
  }
}
