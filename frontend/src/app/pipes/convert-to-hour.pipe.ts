import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToHour'
})
export class ConvertToHourPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    return `${value} óra - ${value + 1} óra`;
  }
}
