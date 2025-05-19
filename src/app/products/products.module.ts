import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { productDetailsGuard } from './product-details.guard';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { productEditGuard } from './product-edit.guard';

@NgModule({
  declarations: [ProductListComponent, ProductDetailsComponent, ProductEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ProductListComponent },
      {
        path: ':id',
        canActivate: [productDetailsGuard],
        component: ProductDetailsComponent,
      },
      {
        path: ':id/edit',
        canDeactivate: [productEditGuard],
        component: ProductEditComponent
      }
    ]),
  ],
  exports: [ProductListComponent, ProductDetailsComponent, RouterModule],
})
export class ProductsModule {}
