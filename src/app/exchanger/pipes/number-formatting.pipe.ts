import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatting',
  standalone: true
})
export class NumberFormattingPipe implements PipeTransform {
  transform(value: number){
    return value.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
