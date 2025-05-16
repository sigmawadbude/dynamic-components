import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  standalone: false,
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent {
  @Input() errorMessage : string | null = null;
  @Output() closeSnackbar = new EventEmitter<boolean>();
  
  close() {
    this.closeSnackbar.emit(true);
  }
}
