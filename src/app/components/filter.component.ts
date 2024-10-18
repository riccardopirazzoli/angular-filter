import { Component, inject,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterService} from '../services/filter.service';


@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      
      <input type="text" placeholder="Search" (input)="filterService.onSearch($event)" />
      <!-- Umani -->
      <h2>Lista di Umani</h2>
      
      <button (click)="filterService.changeAgeHuman(5)">invecchia</button>
      <button (click)="filterService.changeAgeHuman(-5)">ringiovanisci</button>

      <!-- select per le occupazioni -->
      <select (change)="filterService.onSelectOccupation($event)">
        <option value="">Occupazioni</option>
        <option *ngFor="let human of filterService.occupationList()" [value]="human">
          {{ human }}
        </option>
      </select>

      <!-- select per l' età -->
      Età<select (change)="filterService.onSelectAge($event)">
        <option value="">tutte</option>
        <option value="<20">minore di 20</option>
        <option value="20-30">tra 20 e 30</option>
        <option value="30-40">tra 30 e 40</option>
        <option value=">40">maggiore di 40</option>
      </select>

      <!-- btn per ordinare età -->
      <button (click)="filterService.ageSort()">
        Ordina per Età: {{ filterService.ageOrder() === 'asc' ? 'crescente' : 'decrescente' }}
      </button>

      <!--lista umani per nome -->
      <ul>
        @for(human of filterService.filteredHumans();track human.id){
        <li>
          {{ human.name }} - {{ human.occupation }} - {{ human.age }} anni

          <!-- btn per elimare  -->
          <button (click)="filterService.deleteHuman(human)">elimina</button>

        </li>
        }
      </ul>
      <hr />
      <!--lista umani per indirizzo -->
      <ul>
        @for(address of filterService.filteredAddress();track address.id){
        <li>
          {{ address.address.state }} - {{ address.address.city }},
          {{ address.address.street }}

         <!-- btn per elimare  -->
          <button (click)="filterService.deleteHuman(address)">elimina</button>

        </li>
        }
      </ul>
      <!-- Bestie -->
      <h2>Lista delle Bestie</h2>

      <button (click)="filterService.changeLengthBeast(5)">aumenta</button>
      <button (click)="filterService.changeLengthBeast(-5)">diminuisci</button>

      <!-- select per le specie -->
      <select (change)="filterService.onSelectSpecies($event)">
        <option value="">Specie</option>
        <option *ngFor="let species of filterService.speciesList()" [value]="species">
          {{ species }}
        </option>
      </select>

      <!-- select per l'altezza -->
      altezza
      <select (change)="filterService.onSelectLength($event)">
        <option value="">tutte</option>
        <option value="<5">minore di 5</option>
        <option value="5-10">tra 5 e 10</option>
        <option value="10-15">tra 10 e 15</option>
        <option value=">15">maggiore di 15</option>
      </select>

      <!-- btn per oridnare per peso -->
      <button (click)="filterService.weightSort()">
        Ordina per Peso:
        {{ filterService.weightOrder() === 'asc' ? 'crescente' : 'decrescente' }}
      </button>

      <!-- lista bestie per nome -->
      <ul>
        @for(beast of filterService.filteredBeasts();track beast.id){
        <li>
          {{ beast.name }} - {{ beast.species }} - {{ beast.size.length }} metri
          <button (click)="filterService.deleteBeast(beast)">elimina</button>
        </li>
        }
      </ul>
      <hr />

      <!-- gruppo diete bestie-->
      <div *ngFor="let diet of filterService.dietList()">
        <h3>{{ diet }}</h3>
        <ul>
          @for(beast of filterService.beastDiet(diet);track $index){
          <li>
            {{ beast.name }} - {{ beast.species }}
          </li>

          <!-- btn per eliminare -->
          <button (click)="filterService.deleteBeast(beast)">elimina</button>

          }
        </ul>
      </div>
    </div>
  `,
  styles: ``,
})
export class FilterComponent {
  filterService = inject(FilterService)
}
