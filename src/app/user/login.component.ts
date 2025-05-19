import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './login.component.html',
  styles: [
    `
      div.card {
        width: 700px;
      }
    `,
  ],
})
export class LoginComponent {
  isLoginMode = true;
  errorMessage = '';
  pageTitle = 'Log In';

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const username = loginForm.value.username;
      const email = loginForm.form.value.email;
      const password = loginForm.form.value.password;
      if (this.isLoginMode) {
        this.authService.login(email, password).subscribe({
          next: (res) => {
            //this.isLoading = false;
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
            } else {
              this.router.navigate(['/products']);
            }
          },
          error: (err) => {
            //this.isLoading = false;
            this.errorMessage = err;
          },
        });
      } else {
        this.authService.signUp(username, email, password).subscribe({
          next: (res) => {
            //this.isLoading = false;
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
            } else {
              this.router.navigate(['/products']);
            }
          },
          error: (err) => {
            //this.isLoading = false;
            this.errorMessage = err;
          },
        });
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
