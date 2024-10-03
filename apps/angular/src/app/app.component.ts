import { Component, computed, signal } from '@angular/core';
import { NgIf, NgFor, KeyValuePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DocButtonComponent } from '../components/doc-button/doc-button.component';
import { CardWrapper } from '../components/card-wrapper/card-wrapper.component';
import { DaySchedule } from '../components/day-schedule/day-schedule.component';

import { addWeeks, format } from 'date-fns'
import { MatIcon } from '@angular/material/icon';
import {
  bookSlot,
  isAValidBookAppointment,
  type BookAppointment,
  type SlotTime
} from "@book-appointment/modules"
import { SlotTimeButtonComponent } from "../components/slot-time-button/slot-time-button.component";
import { BookSlotModal, type BookSlotForm } from "../components/book-slot-modal/book-slot-modal.component";
import { AppointmentsService } from '../services/appointments.service';
import { SlotsService } from '../services/slots.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    DocButtonComponent,
    DaySchedule,
    CardWrapper,
    NgIf,
    NgFor,
    MatIcon,
    SlotTimeButtonComponent,
    KeyValuePipe,
    BookSlotModal
  ],
})
export class AppComponent {
  currentDayShowing = new Date()
  openModal: boolean = false
  form: Partial<BookAppointment> = {}

  formattedDate = computed(() => format(this.appointment?.start ?? new Date(), "'On' EEEE dd, LLL yyyy 'at' HH:mm"))

  constructor(
    private appointmentsService: AppointmentsService,
    private slotsService: SlotsService
  ) { }
  async ngOnInit() {
    this.slotsService.getWeeklySlots(this.currentDayShowing)
    this.appointmentsService.getCurrentAppointment()
  }

  get appointment()  {
    return this.appointmentsService.data()
  }

  get weekSlots() {
    return this.slotsService.data()
  }

  async getPrevSchedule() {
    this.currentDayShowing = addWeeks(this.currentDayShowing, -1)
    this.slotsService.getWeeklySlots(this.currentDayShowing)
  }

  async getNextSchedule() {
    this.currentDayShowing = addWeeks(this.currentDayShowing, 1)
    this.slotsService.getWeeklySlots(this.currentDayShowing)
  }

  onClickSlot(slot: SlotTime) {
    this.form.start = slot.start
    this.form.end = slot.end
    this.openModal = true
  }

  async saveForm({ comments, ...patient }: BookSlotForm) {
    this.form.comments = comments
    this.form.patient = patient

    if (isAValidBookAppointment(this.form)) {
      try {
        await bookSlot(this.form)
      } finally {
        this.openModal = false
      }
    }

    this.appointmentsService.getCurrentAppointment()
  }
}
