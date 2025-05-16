import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './Serives/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'dynamic-components';
  authService = inject(AuthService);
 
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
