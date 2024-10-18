export interface Human {
    id: number;
    name: string;
    age: number;
    occupation: string;
    address: Address;
  }
  
  interface Address {
    street: string;
    city: string;
    state: string;
    zip: number;
  }
  