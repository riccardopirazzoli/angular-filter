import { Component, inject, signal } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { CommonModule } from '@angular/common';
import { Human } from '../models/human.model';
import { Beast } from '../models/beast.model';

interface Rider {
  human: Human;
  beast: Beast;
}

@Component({
  selector: 'app-rider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Crea un Rider</h2>

    <select (change)="selectHuman($event)">
      <option
        *ngFor="let human of filterService.humansSignal()"
        [value]="human.name"
      >
        {{ human.name }}
      </option>
    </select>

    <select (change)="selectBeast($event)">
      <option
        *ngFor="let beast of filterService.beastsSignal()"
        [value]="beast.name"
      >
        {{ beast.name }}
      </option>
    </select>

    <button (click)="addRider()">Aggiungi Rider</button>

    <h2>Lista Riders</h2>
    <table>
      <thead>
        <tr>
          <th>Umano</th>
          <th>Bestia</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let rider of ridersSig()">
          <td>{{ rider.human.name }}</td>

          <td>{{ rider.beast.name }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: ``,
})
export class RiderComponent {

  filterService = inject(FilterService);

  selectHumanSig = signal<Human | null>(null);
  selectBeastSig = signal<Beast | null>(null);
  ridersSig = signal<Rider[]>([]);


  
  selectHuman(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const humanName = inputElement.value;
    const human = this.filterService
      .humansSignal()
      .find((h) => h.name === humanName);
    if (human) this.selectHumanSig.set(human);
  }
  
  selectBeast(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const beastName = inputElement.value;
    const beast = this.filterService
      .beastsSignal()
      .find((b) => b.name === beastName);
    if (beast) this.selectBeastSig.set(beast);
  }

  addRider() {
    const human = this.selectHumanSig();
    const beast = this.selectBeastSig();
    if (human && beast)
      this.ridersSig.update((riders) => [...riders, { human, beast }]);
  }
}
