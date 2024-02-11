import { ContentChild, Injectable } from '@angular/core';
import { ConverterItem } from '@exchanger/models/converter-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  converterItem = new BehaviorSubject<ConverterItem>({
    amount: 0,
    convertedAmount: 0,
    from: 'EUR',
    to: 'USD',
    fromRate: 1,
    toRate: 0
  })

  specialCurrenciesList: any[] = []

  constructor() {
    this.specialCurrenciesList = [
      'USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'NZD', 'CNY'
    ]
  }

   get ratesList() {
    const ratesString = localStorage.getItem('rates');
    if (ratesString) {
      return JSON.parse(ratesString);
    } else {
      return null;
    }
   }

   get currenciesList() {
    return localStorage.getItem('currencies')
  }

  getCurrencyRate(conveterValues: ConverterItem): { fromValue: number | null, toValue: number | null } {
    let fromValue: number | null = null;
    let toValue: number | null = null;
    if (this.ratesList) {
      for (const currency of Object.keys(this.ratesList)) {
        const rate = this.ratesList[currency];
        if (currency === conveterValues.from) {
          fromValue = rate;
        }
        if (currency === conveterValues.to) {
          toValue = rate;
        }
      }
    }

    return { fromValue, toValue };
  }

   calculateAmount(convertItem: ConverterItem){

    let convertedAmount = 0
    const fromRate = this.ratesList[convertItem.from];
    const toRate = this.ratesList[convertItem.to];
    if (fromRate !== undefined && toRate !== undefined) {
      convertedAmount = (convertItem.amount * toRate) / fromRate
      convertItem.convertedAmount =convertedAmount
      this.converterItem.next(convertItem)
      return convertedAmount;
    } else {
      return 0;
    }
   }

   calculateOtherCurrencies(converterItem: ConverterItem) {
      let currenciesWithValues = []
      for(let currency of this.specialCurrenciesList) {
        const currencyRate = this.ratesList[currency];
        const fromRate = this.ratesList[converterItem.from];
        currenciesWithValues.push({currency: currency , value : (converterItem.amount * currencyRate) / fromRate })
      }
      return currenciesWithValues
   }

   updateRates(converterItem: ConverterItem) {
    converterItem.fromRate = this.getCurrencyRate(converterItem)?.fromValue ?? 0;
    converterItem.toRate = this.getCurrencyRate(converterItem)?.toValue ?? 0;
    this.converterItem.next({...converterItem})
   }


}
