import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  standalone: false,
  template: '<div class="sb sb-error">{{ errorMessage }} <span class="fa fa-close" (click)="close()"></span></div>',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent {
  @Input() errorMessage : string | null = null;
  @Output() closeSnackbar = new EventEmitter<boolean>();
  
  close() {
    this.closeSnackbar.emit(true);
  }
}
