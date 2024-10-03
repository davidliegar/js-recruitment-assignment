import { Component, EventEmitter, Input, Output, HostBinding } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-doc-button',
  templateUrl: './doc-button.component.html',
  styleUrl: './doc-button.component.css',
  imports: [
    NgClass,
    NgIf,
    MatIcon
  ]
})
export class DocButtonComponent {
  @Input() icon?: string;
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() disabled = false;

  @Output() onClick = new EventEmitter<void>();

  @HostBinding('class.disabled') get isDisabled() {
    return this.disabled;
  }

  handleClick() {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }
}
