import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div class="container"><app-home /><div>`,
  standalone: false,
  styles: [`.nav-link {  font-size: large;}`]
})
export class AppComponent {
  title = 'APM';
}
