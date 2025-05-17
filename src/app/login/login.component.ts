import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../Serives/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  errorMessage: string | null = null;
  sub = new Subscription();

  authService = inject(AuthService);
  router = inject(Router);

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    if(this.isLoginMode){
      this.sub.add(
      this.authService.signIn(email, password).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.router.navigate(['/dashboard/overview']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err;        
        }
      }));
    }else {
      this.authService.signUp(email, password).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.router.navigate(['/dashboard/overview']);
        },
        error: (err) => {        
          this.isLoading = false;
          this.errorMessage = err;
        }
      });
    }
  }

  CloseSnackbar() {
    this.errorMessage = null;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
