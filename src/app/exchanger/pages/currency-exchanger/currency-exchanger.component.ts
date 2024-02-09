import { Component, OnInit } from '@angular/core';
import { ConverterItem } from '@exchanger/models/converter-item';
import { ConverterApiService } from '@exchanger/services/converter.api.service';
import { ConverterService } from '@exchanger/services/converter.service';

@Component({
  selector: 'app-currency-exchanger',
  templateUrl: './currency-exchanger.component.html',
  styleUrl: './currency-exchanger.component.scss'
})
export class CurrencyExchangerComponent  {
  constructor(private converterService: ConverterService) {}


  onConvert(event:ConverterItem) {

    this.converterService.calculateAmount(event)
  }
}
