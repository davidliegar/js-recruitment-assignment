import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { format } from 'date-fns';
import { SlotTime } from '@book-appointment/modules'
import { SlotTimeButtonComponent } from '../slot-time-button/slot-time-button.component';

@Component({
  standalone: true,
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrl: './day-schedule.component.css',
  imports: [
    SlotTimeButtonComponent,
    NgClass,
    NgFor
  ]
})
export class DaySchedule {
  @Input() date!: string;
  @Input() daySchedule!: SlotTime[];

  @Output() onClick = new EventEmitter<SlotTime>();

  formatDate(date: string, formatStr: string): string {
    return format(new Date(date), formatStr);
  }

  handleClick(slotTime: SlotTime) {
    this.onClick.emit(slotTime);
  }

  generateKey(date: string, index: number): string {
    return `${date}-${index}`;
  }
}
