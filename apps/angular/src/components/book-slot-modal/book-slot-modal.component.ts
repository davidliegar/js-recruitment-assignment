import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DocInputComponent } from '../doc-input/doc-input.component';
import { DocButtonComponent } from "../doc-button/doc-button.component";

export interface BookSlotForm {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  comments: string;
}

@Component({
  standalone: true,
  selector: 'app-book-slot-modal',
  templateUrl: './book-slot-modal.component.html',
  styleUrl: './book-slot-modal.component.css',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DocInputComponent,
    DocButtonComponent
]
})
export class BookSlotModal {
  @Input() open: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<BookSlotForm>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }

  ngOnChanges() {
    if (this.open) {
      const modal = document.querySelector('dialog');
      modal?.showModal();
    } else {
      const modal = document.querySelector('dialog');
      modal?.close();
    }
  }

  onCloseFn() {
    this.onClose.emit();
  }

  onSaveFn() {
    if (this.form.valid) {
      this.onSave.emit(this.form.value);
    }
  }
}
