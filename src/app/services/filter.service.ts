import { computed, Injectable, signal } from '@angular/core';
import { HUMANS } from '../data/human.const';
import { BEASTS } from '../data/beast.const';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  humans = HUMANS;
  beasts = BEASTS;

  humansSignal = signal(HUMANS);
  beastsSignal = signal(BEASTS);

  searchName = signal('');
  selectedOccupation = signal('');
  selectedSpecies = signal('');
  selectedAge = signal('');
  selectedLength = signal('');
  ageOrder = signal<'asc' | 'disc'>('asc');
  weightOrder = signal<'asc' | 'disc'>('asc');

  // Filtri umani
  filteredHumans = computed(() =>
    this.humansSignal()
      .filter(
        (human) =>
          (human.name.toLowerCase().includes(this.searchName()) &&
            (human.occupation === this.selectedOccupation() ||
              this.selectedOccupation() === '') &&
            this.selectedAge() === '') ||
          this.ageRange(human.age)
      )
      .sort((a, b) =>
        this.ageOrder() === 'asc' ? a.age - b.age : b.age - a.age
      )
  );
  //Filtro per indirizzo
  filteredAddress = computed(() =>
    this.humansSignal().sort((a, b) => a.address.state.localeCompare(b.address.state))
  );

  // Filtri bestie
  filteredBeasts = computed(() =>
    this.beastsSignal()
      .filter(
        (beast) =>
          beast.name.toLowerCase().includes(this.searchName()) &&
          (beast.species === this.selectedSpecies() ||
            this.selectedSpecies() === '') &&
          (this.selectedLength() === '' || this.lengthRange(beast.size.length))
      )
      .sort((a, b) =>
        this.weightOrder() === 'asc'
          ? a.size.weight - b.size.weight
          : b.size.weight - a.size.weight
      )
  )
  //filtro per le diete
  beastDiet(diet: string) {
    return this.beastsSignal().filter((beast) => beast.diet === diet);
  }

//creazione Liste
  occupationList = computed(() =>
    Array.from(new Set(this.humans.map((human) => human.occupation)))
  );
  speciesList = computed(() =>
    Array.from(new Set(this.beasts.map((beast) => beast.species)))
  )
  dietList = computed(() =>
    Array.from(new Set(this.beasts.map((beast) => beast.diet)))
  )

//filtrare umani per anni
  ageRange(age: number) {
    const range = this.selectedAge();
    switch (range) {
      case '<20':
        return age < 20;
      case '20-30':
        return age >= 20 && age <= 30;
      case '30-40':
        return age >= 30 && age <= 40;
      case '>40':
        return age > 40;
      default:
        return null;
    }
  }
//filtrare bestie per altezza

  lengthRange(length: number) {
    const range = this.selectedLength();
    switch (range) {
      case '<5':
        return length < 5;
      case '5-10':
        return length >= 5 && length <= 10;
      case '10-15':
        return length >= 10 && length <= 15;
      case '>15':
        return length > 15;
      default:
        return null;
    }
  }
//ordiniamo il signal ageOrder in modo crescente o decrescente
  ageSort() {
    this.ageOrder.set(this.ageOrder() === 'asc' ? 'disc' : 'asc');
  }
  
//ordiniamo il signal weightOrder in modo crescente o decrescente
  weightSort() {
    this.weightOrder.set(this.weightOrder() === 'asc' ? 'disc' : 'asc');
  }

//Metodo per cambiare l'età degli umani
  changeAgeHuman(amount:number){
    this.humansSignal.update((humans)=>
    humans.map((human)=>{
      const newAge = human.age + amount
      if(newAge<1 || newAge>100)
        return human
      else{
        return {...human,age:newAge}
      }
    }))
  }
//Metodo per cambiare Lunghezza delle bestie
  changeLengthBeast(amount:number){
    this.beastsSignal.update((beasts)=>
      beasts.map((beast)=>{
        const newLength = beast.size.length + amount
        if(newLength<1 || newLength>20)
          return beast
        else{
          return{
            ...beast,
            size:{...beast.size,length: newLength}
          }
        }
      }))
    }
  
//Metodi per btn Elimina
  deleteHuman(toDelete: any) {
    this.humansSignal.set(
      this.humansSignal().filter((beast) => beast !== toDelete)
    );
  }
  deleteBeast(toDelete: any) {
    this.beastsSignal.set(
      this.beastsSignal().filter((beast) => beast !== toDelete)
    );
  }

  //Input
  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) this.searchName.set(inputElement.value);
  }
  onSelectOccupation(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) this.selectedOccupation.set(inputElement.value);
  }

  onSelectSpecies(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) this.selectedSpecies.set(inputElement.value);
  }

  onSelectLength(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) this.selectedLength.set(inputElement.value);
  }
  onSelectAge(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) this.selectedAge.set(inputElement.value);
  }
}
