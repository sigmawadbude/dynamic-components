import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../utility/loader/loader.component';
import { SnackbarComponent } from '../utility/snackbar/snackbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoaderComponent, SnackbarComponent],
  exports: [LoaderComponent, SnackbarComponent, FormsModule],
  imports: [FormsModule],
})
export class SharedModule {}
