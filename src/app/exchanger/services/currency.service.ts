import { Injectable } from '@angular/core';
import { ConverterItem } from '@exchanger/models/converter-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() {
  }

   get currencyNames() {
    const currencyNames = localStorage.getItem('currencyNames');
    if (currencyNames) {
      return JSON.parse(currencyNames);
    } else {
      return null;
    }
   }

   getCurrencyName(symbol:string) {
    return  this.currencyNames[symbol]
   }

}
