import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilterComponent } from "./components/filter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FilterComponent],
  template: `
    <app-filter></app-filter>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular-demo18';
}
