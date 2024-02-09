import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangerRoutingModule } from './exchanger-routing.module';
import { ConverterComponent } from './components/converter/converter.component';
import { CurrencyExchangerComponent } from './pages/currency-exchanger/currency-exchanger.component';
import { CurrencyDetailsComponent } from './pages/currency-details/currency-details.component';
import { SelectDropdownComponent } from 'app/shared/components/select-dropdown/select-dropdown.component';


@NgModule({
  declarations: [CurrencyExchangerComponent , CurrencyDetailsComponent],
  imports: [
    CommonModule,
    ExchangerRoutingModule,
    ConverterComponent,
    SelectDropdownComponent
  ]
})
export class ExchangerModule { }
