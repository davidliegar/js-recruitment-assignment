import { Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common'
import { MatIcon } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-card-wrapper',
  templateUrl: './card-wrapper.component.html',
  styleUrl: './card-wrapper.component.css',
  imports: [
    NgClass,
    NgIf,
    MatIcon
  ]
})
export class CardWrapper {
  @Input() expandFrom?: string;
  @Input() variant?: 'primary' | 'error' = 'primary';
  seeMore = false;

  toggleSeeMore() {
    this.seeMore = !this.seeMore;
  }
}
