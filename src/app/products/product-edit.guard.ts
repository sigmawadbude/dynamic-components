import { CanDeactivateFn } from '@angular/router';
import { ProductEditComponent } from './product-edit/product-edit.component';

export const productEditGuard: CanDeactivateFn<ProductEditComponent> = (component, currentRoute, currentState, nextState): boolean => {
  if (component.isDirty) {
            const productName = component.product?.productName || 'New Product';
            return confirm(`Navigate away and lose all changes to ${productName}?`);
        }
        return true;
};
