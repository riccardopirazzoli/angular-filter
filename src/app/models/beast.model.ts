export interface Beast {
    id: number;
    name: string;
    species: string;
    habitat: string;
    diet: string;
    size: Size;
  }
  
  interface Size {
    length: number;
    weight: number;
  }
  