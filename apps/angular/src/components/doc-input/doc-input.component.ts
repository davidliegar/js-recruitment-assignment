import { Component, forwardRef, Input } from '@angular/core';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-doc-input',
  templateUrl: './doc-input.component.html',
  styleUrl: './doc-input.component.css',
  imports: [
    FormsModule
  ],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DocInputComponent),
      multi: true
    }
  ],
})
export class DocInputComponent implements ControlValueAccessor {
  @Input() type: string = '';
  @Input() placeholder?: string;
  @Input() label?: string;

  inputId: string = `input-${Math.random().toString(36).substr(2, 9)}`;
  value: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  onInput(target: EventTarget | null) {
    this.value = (target as HTMLInputElement)?.value ?? '';
    this.onChange(this.value);
  }

  // Métodos de la interfaz ControlValueAccessor
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
