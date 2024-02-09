import { Component, OnInit } from '@angular/core';
import { ConverterItem } from '@exchanger/models/converter-item';
import { ConverterApiService } from '@exchanger/services/converter.api.service';
import { ConverterService } from '@exchanger/services/converter.service';

@Component({
  selector: 'app-currency-exchanger',
  templateUrl: './currency-exchanger.component.html',
  styleUrl: './currency-exchanger.component.scss'
})
export class CurrencyExchangerComponent implements OnInit {
  amount: number = 0
  currenciesValues: any[] = []
  constructor(private converterApiService: ConverterApiService , private converterService: ConverterService) {}
  ngOnInit(): void {
    if(!localStorage.getItem('rates')) {
      this.getLatestRates()
    }
  }

  getLatestRates() {
    this.converterApiService.latestRates().subscribe((response:any) => {
      console.log(response['rates']);
      localStorage.setItem("rates", JSON.stringify(response['rates']))
      localStorage.setItem("currencies", JSON.stringify(Object.keys(response['rates'])))
    })
  }

  onConvert(event:ConverterItem) {

    this.amount = this.converterService.calculateAmount(event)
    this.currenciesValues = this.converterService.calculateOtherCurrencies(event)

  }
}
