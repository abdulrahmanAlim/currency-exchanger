import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangerRoutingModule } from './exchanger-routing.module';
import { ConverterComponent } from './components/converter/converter.component';
import { CurrencyExchangerComponent } from './pages/currency-exchanger/currency-exchanger.component';
import { CurrencyDetailsComponent } from './pages/currency-details/currency-details.component';


@NgModule({
  declarations: [CurrencyExchangerComponent , CurrencyDetailsComponent],
  imports: [
    CommonModule,
    ExchangerRoutingModule,
    ConverterComponent
  ]
})
export class ExchangerModule { }
