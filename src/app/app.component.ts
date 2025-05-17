import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './Serives/auth.service';

@Component({
  selector: 'app-root',
  template: `<div class="app-content">
  <app-header />
  <div class="app-main-area">
    <router-outlet></router-outlet>
  </div>
  <app-footer></app-footer>
</div>`,
  standalone: false,
  styles: [`
    .app-main-area{
    margin: 10px 10px;
    background-color: #F7F9F9;
}
    `]
})
export class AppComponent implements OnInit {
  title = 'dynamic-components';
  authService = inject(AuthService);
 
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
