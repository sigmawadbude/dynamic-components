import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { StarComponent } from './shared/star/star.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    StarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConvertToSpacesPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
