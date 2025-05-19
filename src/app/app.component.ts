import { Component, inject } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <app-menu />
    <div class='container'>
      <router-outlet />
    </div>
  `,
  standalone: false,
  styles: [`.nav-link {  font-size: large;}`]
})
export class AppComponent {
  authService = inject(AuthService);
 
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
