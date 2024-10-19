import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilterComponent } from './components/filter.component';
import { RiderComponent } from './components/rider.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FilterComponent, RiderComponent],
  template: `
    <app-filter></app-filter>
    <hr />
    <app-rider></app-rider>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular-demo18';
}
