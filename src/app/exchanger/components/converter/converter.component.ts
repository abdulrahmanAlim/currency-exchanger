import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConverterItem } from '@exchanger/models/converter-item';
import { ConverterService } from '@exchanger/services/converter.service';
import { SelectDropdownComponent } from '../select-dropdown/select-dropdown.component';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [SelectDropdownComponent , FormsModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss'
})
export class ConverterComponent implements OnInit {
  @Output()  convertEmitter = new EventEmitter<ConverterItem>()
  @Input() exchangedAmount:number = 0

  amount:number = 0


  converterItem: ConverterItem  = {
    amount: 0,
    from: 'EUR',
    to: 'USD'
  }
  values: any = {
    fromValue:1,
    toValue:0
  }

  currenciesList
  constructor(private converter: ConverterService) {
    this.currenciesList =  converter.currenciesList ? JSON.parse(converter.currenciesList) : null
  }

  ngOnInit(): void {
    this.values = this.converter.getCurrencyRate(this.converterItem)
  }

  onUpdateSelection(updatedValues: any) {
    if(updatedValues.type === 'from') {
      this.converterItem.from = updatedValues.value
    } else {
      this.converterItem.to = updatedValues.value
    }

    this.values = this.converter.getCurrencyRate(this.converterItem)

  }

  onSelectItem(currency: string , type: string) {
    switch (type) {
      case 'from':
        this.converterItem.from = currency
        break;
      case 'to':
        this.converterItem.to = currency
        break;
      default:
        break;
    }
  }

  swapCurrencies() {
    const temp = this.converterItem.from;
    this.converterItem.from = this.converterItem.to;
    this.converterItem.to = temp;
    this.values = this.converter.getCurrencyRate(this.converterItem)
    this.converterItem = { ...this.converterItem}
  }

  convert() {
    this.converterItem.amount  = this.amount
    this.convertEmitter.emit(this.converterItem)
  }
}
