import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../Serives/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  authService = inject(AuthService);
  isLoggedIn = false;

  sub = new Subscription();

  ngOnInit(): void {
    this.sub = this.authService.user.subscribe(user => {
      this.isLoggedIn = user ? true : false;
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logOut() {
    this.authService.logOut();
  }
}
