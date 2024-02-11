import { Component, OnInit } from '@angular/core';
import { ConverterItem } from '@exchanger/models/converter-item';
import { ConverterApiService } from '@exchanger/services/converter.api.service';
import { ConverterService } from '@exchanger/services/converter.service';
import { LogoComponent } from 'app/core/layout/components/header/components/logo/logo.component';

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
  currenciesValues: any[] = []
  constructor(private converterApiService: ConverterApiService , private converterService: ConverterService) {}
  ngOnInit(): void {
    if(!localStorage.getItem('rates')) {
      this.getLatestRates()
    }
    this.converterService.converterItem.subscribe(item => {
      this.converterItem = item
    })
  }

  getLatestRates() {
    this.converterApiService.latestRates().subscribe((response:any) => {
      localStorage.setItem("rates", JSON.stringify(response['rates']))
      localStorage.setItem("currencies", JSON.stringify(Object.keys(response['rates'])))
    })
  }

  onConvert(event:ConverterItem) {
    this.converterItem.convertedAmount = this.converterService.calculateAmount(event)
    this.currenciesValues = this.converterService.calculateOtherCurrencies(event)
  }
}
