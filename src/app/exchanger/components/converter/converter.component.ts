import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConverterItem } from '@exchanger/models/converter-item';
import { ConverterService } from '@exchanger/services/converter.service';
import { SelectDropdownComponent } from 'app/shared/components/select-dropdown/select-dropdown.component';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [SelectDropdownComponent , FormsModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss'
})
export class ConverterComponent {
  amount:number = 0

  converterItem: ConverterItem  = {
    amount: 0,
    from: 'EUR',
    to: 'USD'
  }

  constructor() {
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

}
