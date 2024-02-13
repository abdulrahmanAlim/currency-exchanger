import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConverterItem } from '@exchanger/models/converter-item';

@Component({
  selector: 'app-select-dropdown',
  standalone: true,
  imports: [CommonModule  , FormsModule ],
  templateUrl: './select-dropdown.component.html',
  styleUrl: './select-dropdown.component.scss'
})
export class SelectDropdownComponent implements OnChanges {
  @Input() items: unknown
  @Input() type: string = ''
  @Input() disabled: boolean = false
  @Input() defaultValues: ConverterItem = {
    amount: 0,
    convertedAmount: 0,
    from: '',
    to: '',
    fromRate: 0,
    toRate: 0
  }
  @Output() selectedItem = new EventEmitter<any>();
  @Output() updatedValues = new EventEmitter<any>();
  selectedValue: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if ('defaultValues' in changes) {
      this.selectedValue = this.type === 'from' ? this.defaultValues.from : this.defaultValues.to;
    }
  }




  onChange(event: any , type: string) {
    this.selectedItem.emit(event.target.value)
    if(type == 'to') {
      this.defaultValues.to=  event.target.value
      this.updatedValues.emit({value: event.target.value , type: 'to'})
    } else {
      this.defaultValues.from=  event.target.value
      this.updatedValues.emit({value: event.target.value , type: 'from'})
    }
  }

}
