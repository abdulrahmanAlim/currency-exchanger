import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConverterItem } from '@exchanger/models/converter-item';
import { CurrencyItem } from '@exchanger/models/currency';
import { ConverterService } from '@exchanger/services/converter.service';
import { CurrencyApiService } from '@exchanger/services/currency.api.service';
import { CurrencyService } from '@exchanger/services/currency.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrl: './currency-details.component.scss'
})
export class CurrencyDetailsComponent{
  amount: number = 0
  currenciesValues: string[] = []
  queryParams: string = '';
  chartData: any
  currencyItem: CurrencyItem =  {
    currency: '',
    firstCurrency: '',
    secondCurrency: ''
  }
  isDetailsPage: boolean = true;
  converterItem: ConverterItem = {
    amount: 0,
    convertedAmount: 0,
    from: '',
    to: '',
    fromRate: 0,
    toRate: 0
  }

  routingSubscription = new Subscription;
  converterItemSubscription = new Subscription;
  currenciesList= []
  constructor(
    private converterService: ConverterService ,
    private currencyApiService :CurrencyApiService ,
    private currencyService: CurrencyService ,
    private route: ActivatedRoute,
    private router: Router
    ) {}


  ngOnInit(){
    this.converterItemSubscription = this.converterService.converterItem.subscribe(item => {
      this.converterItem= {...item}
     })

    this.routingSubscription = this.route.params.subscribe(params => {
      this.queryParams = params['type'];
      this.currencyItem  = this.currencyService.getCurrencyName(this.queryParams)

      if(this.currencyItem.firstCurrencyCode  && this.currencyItem.secondCurrencyCode) {
        this.converterItem.from = this.currencyItem.firstCurrencyCode
        this.converterItem.to = this.currencyItem.secondCurrencyCode
        this.converterService.updateRates(this.converterItem)
        this.getChartData(this.currencyItem)
      }

   });

   if(!localStorage.getItem('currencyNames')) {
    this.getCurrencyNames()
   }
   this.getCurrencyHistoricalRates()
   this.currenciesList =  this.converterService.currenciesList ? JSON.parse(this.converterService.currenciesList) : null
  }

  getCurrencyNames() {
    this.currencyApiService.getCurrencyNames().subscribe((response:any) => {
      localStorage.setItem("currencyNames", JSON.stringify(response['symbols']))
      this.currencyItem  = this.currencyService.getCurrencyName(this.queryParams)
    })
  }

  getCurrencyHistoricalRates() {
    this.currencyApiService.getHistoricalRates().subscribe((response:any) => {
      localStorage.setItem("data", JSON.stringify(response))
    })
  }

  onConvert(event:ConverterItem) {
    this.amount = this.converterService.calculateAmount(event)
  }

  goBack() {
    this.router.navigate(['/']);
  }

  onUpdate(status: boolean) {
    this.currencyItem  = this.currencyService.getCurrencyName(this.converterItem.from)
  }

  getChartData(currencyItem:CurrencyItem) {
    this.chartData = this.currencyService.getCurrencyChart(currencyItem)
  }
}
