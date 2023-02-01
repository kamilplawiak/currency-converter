import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mat-app-background'
  }
})
export class AppComponent {
  title = 'currency-converter';
}
