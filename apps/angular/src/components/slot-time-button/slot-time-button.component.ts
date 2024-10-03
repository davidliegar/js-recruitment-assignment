import { Component, Input, Output, EventEmitter, computed } from '@angular/core';
import { NgClass } from '@angular/common';

import { format, compareAsc, setHours } from 'date-fns';
import { SlotTime } from '@book-appointment/modules';

@Component({
  standalone: true,
  selector: 'app-slot-time-button',
  templateUrl: './slot-time-button.component.html',
  styleUrl: './slot-time-button.component.css',
  imports: [
    NgClass
  ]
})
export class SlotTimeButtonComponent {
  @Input() slotTime!: SlotTime;
  @Output() onClick = new EventEmitter<SlotTime>();

  timeFormatted = computed(() => format(this.slotTime.start, 'HH:mm'));
  isDisabled = computed(() => compareAsc(this.slotTime.start, setHours(new Date(), 14)) === -1);

  handleClick() {
    if (!this.isDisabled()) {
      this.onClick.emit(this.slotTime);
    }
  }
}
