import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangerRoutingModule } from './exchanger-routing.module';
import { ConverterComponent } from './components/converter/converter.component';
import { CurrencyExchangerComponent } from './pages/currency-exchanger/currency-exchanger.component';
import { CurrencyDetailsComponent } from './pages/currency-details/currency-details.component';
import { DynamicChartComponent } from './components/dynamic-chart/dynamic-chart.component'
import { NumberFormattingPipe } from './pipes/number-formatting.pipe';


@NgModule({
  declarations: [CurrencyExchangerComponent , CurrencyDetailsComponent , ],
  imports: [
    CommonModule,
    ExchangerRoutingModule,
    ConverterComponent,
    DynamicChartComponent,
    NumberFormattingPipe
  ]
})
export class ExchangerModule { }
