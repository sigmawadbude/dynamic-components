import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { productDetailsGuard } from './products/product-details.guard';

const routes: Routes = [
  { path: 'welcome', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  {
    path: 'products/:id',
    canActivate: [productDetailsGuard],
    component: ProductDetailsComponent,
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
