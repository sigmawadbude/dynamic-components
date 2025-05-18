import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../product-list/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent {
  pageTitle = 'Product Detail';
  errorMessage = '';
  product: IProduct | undefined;
  route = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getProduct(id);
    }
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: (product) => (this.product = product),
      error: (err) => (this.errorMessage = err),
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
