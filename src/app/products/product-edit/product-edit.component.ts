import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from '../product-list/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  standalone: false,
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent {
 @ViewChild(NgForm) editForm?: NgForm;
  pageTitle = 'Product Edit';
  errorMessage = '';
  private originalProduct?: IProduct;
  product?: IProduct;

  get isDirty(): boolean {
    return this.editForm?.dirty ? true : false;
  }

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getProduct(id);
      }
    );
  }

  getProduct(id: number): void {
    this.productService.getProduct(id)
      .subscribe({
        next: product => this.onProductRetrieved(product),
        error: err => this.errorMessage = err
      });
  }

  onProductRetrieved(product: IProduct): void {
    // Reset back to pristine
    this.editForm?.reset();

    // Display the data in the form
    // Use a copy to allow cancel.
    this.originalProduct = product;
    this.product = Object.assign({}, product);

    if (this.product.productId === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }
  }

  cancel(): void {
    // Navigate back to the product list
    this.router.navigate(['/products']);
  }

  deleteProduct(): void {
    if (this.product?.productId) {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.productId)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    } else {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    }
  }

  saveProduct(): void {
    if (this.editForm?.valid && this.product) {
      this.productService.saveProduct(this.product)
        .subscribe({
          next: () => {
            if (this.product && this.originalProduct) {
              // Assign the changes from the copy
              for (let key in this.product) 
                (this.originalProduct as any)[key as keyof IProduct] = this.product[key as keyof IProduct];
              this.onSaveComplete();
            }
          },
          error: err => this.errorMessage = err
        });
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset back to pristine
    this.editForm?.reset(this.editForm.value);
    // Navigate back to the product list
    this.router.navigate(['/products']);
  }
}
