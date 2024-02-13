import { Component, OnInit } from '@angular/core';
import { ConverterItem } from '@exchanger/models/converter-item';
import { CurrencyValue } from '@exchanger/models/currency';
import { ConverterApiService } from '@exchanger/services/converter.api.service';
import { ConverterService } from '@exchanger/services/converter.service';
import { CurrencyApiService } from '@exchanger/services/currency.api.service';

@Component({
  selector: 'app-currency-exchanger',
  templateUrl: './currency-exchanger.component.html',
  styleUrl: './currency-exchanger.component.scss'
})
export class CurrencyExchangerComponent implements OnInit {
  converterItem: ConverterItem = {
    amount: 0,
    convertedAmount: 0,
    from: 'EUR',
    to: 'USD',
    fromRate: 0,
    toRate: 0
  }
  currenciesList = []
  currenciesValues: CurrencyValue[] = []
  constructor(private converterApiService: ConverterApiService , private converterService: ConverterService ,private  currencyApiService: CurrencyApiService) {}
  ngOnInit(): void {

    if(!localStorage.getItem('currencyNames')) {
      this.getCurrencyNames()
     }

    if(!localStorage.getItem('rates')) {
      this.getLatestRates()
    } else {
      this.currenciesList =  this.converterService.currenciesList ? JSON.parse(this.converterService.currenciesList) : null
    }
    this.converterService.converterItem.subscribe(item => {
      this.converterItem = item
    })
    this.getCurrencyHistoricalRates()
  }

  getCurrencyHistoricalRates() {
    this.currencyApiService.getHistoricalRates().subscribe((response:any) => {
      localStorage.setItem("data", JSON.stringify(response))
    })
  }

  getCurrencyNames() {
    this.currencyApiService.getCurrencyNames().subscribe((response:any) => {
      localStorage.setItem("currencyNames", JSON.stringify(response['symbols']))
    })
  }

  getLatestRates() {
    this.converterApiService.latestRates(this.converterItem.from).subscribe((response:any) => {
      localStorage.setItem("rates", JSON.stringify(response['rates']))
      localStorage.setItem("currencies", JSON.stringify(Object.keys(response['rates'])))
      this.currenciesList =  this.converterService.currenciesList ? JSON.parse(this.converterService.currenciesList) : null
    })
  }

  onConvert(event:ConverterItem) {
    this.converterItem.convertedAmount = this.converterService.calculateAmount(event)
    this.currenciesValues = this.converterService.calculateOtherCurrencies(event)
  }
}
