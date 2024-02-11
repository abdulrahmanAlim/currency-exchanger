import { Injectable } from '@angular/core';
import { ConverterItem } from '@exchanger/models/converter-item';
import { CurrencyItem } from '@exchanger/models/currency';
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

   get currencyRatesHistoricalData() {
    const currencyHistoricalData = localStorage.getItem('data');
    if (currencyHistoricalData) {
      return JSON.parse(currencyHistoricalData);
    } else {
      return null;
    }
   }

   getCurrencyName(symbol:string) {
    let currencyItem: CurrencyItem = {}
    if(symbol.length > 3) {
      currencyItem.firstCurrencyCode = symbol.substring(0, 3)
      currencyItem.secondCurrencyCode = symbol.substring(3, 6)
      currencyItem.firstCurrency = this.currencyNames[symbol.substring(0, 3)]
      currencyItem.secondCurrency = this.currencyNames[symbol.substring(3, 6)]
      return currencyItem
    }  else {
      currencyItem.currency = this.currencyNames[symbol]
      currencyItem.currencyCode = symbol
      return  currencyItem
    }
   }

   getCurrencyChart(currenyItem: CurrencyItem){
     const data = {
      labels: this.mapData(currenyItem)['labels'] ,
      datasets: [
        {
        label: currenyItem.firstCurrency,
        data: this.mapData(currenyItem)['data'],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
        },
    ]
    };
    return data
   }

   mapData(currencyItem:CurrencyItem) {
    let chartObject = {
      labels: [] as any[],
      data: [] as any[]
    }
      this.currencyRatesHistoricalData[`${currencyItem.firstCurrencyCode}${currencyItem.secondCurrencyCode}`].forEach((data:any) => {
        chartObject.labels.push(data.date);
        chartObject.data.push(data.mid);
      });
    return chartObject
   }



}
