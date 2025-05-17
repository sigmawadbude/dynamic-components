import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent, RouterModule],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
  ],
})
export class AuthModule {}
