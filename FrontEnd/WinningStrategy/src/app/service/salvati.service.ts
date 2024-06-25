import { Injectable } from '@angular/core';
import { DatiSalvati } from '../interface/dati-salvati.interface';

@Injectable({
  providedIn: 'root'
})
export class SalvatiService {

  constructor() { }
  saveData(data: DatiSalvati): void {
    localStorage.setItem('savedData', JSON.stringify(data));
  }

  getSavedData(): DatiSalvati | null {
    const savedDataString = localStorage.getItem('savedData');
    if (savedDataString) {
      return JSON.parse(savedDataString);
    }
    return null;
  }

  clearSavedData(): void {
    localStorage.removeItem('savedData');
  }
  
}
