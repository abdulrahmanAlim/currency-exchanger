import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConverterItem } from '@exchanger/models/converter-item';
import { ConverterService } from '@exchanger/services/converter.service';
import { CurrencyApiService } from '@exchanger/services/currency.api.service';
import { CurrencyService } from '@exchanger/services/currency.service';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrl: './currency-details.component.scss'
})
export class CurrencyDetailsComponent {
  amount: number = 0
  currenciesValues: string[] = []
  queryParams: string = '';
  currencyName: string =''
  isDetailsPage: boolean = true;
  converterItem: ConverterItem = {
    amount: 0,
    convertedAmount:0,
    from: '',
    to: ''
  }
  constructor(
    private converterService: ConverterService ,
    private currencyApiService :CurrencyApiService ,
    private currencyService: CurrencyService ,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.queryParams = params['type'];
   });

   this.converterService.converterItem.subscribe(item => {
    this.converterItem= item
   })

   if(!localStorage.getItem('currencyNames')) {
    this.getCurrencyNames()
   }

   this.currencyName  = this.currencyService.getCurrencyName(this.queryParams)
  }

  getCurrencyNames() {
    this.currencyApiService.getCurrencyNames().subscribe((response:any) => {
      localStorage.setItem("currencyNames", JSON.stringify(response['symbols']))
    })
  }

  onConvert(event:ConverterItem) {
    this.amount = this.converterService.calculateAmount(event)
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
