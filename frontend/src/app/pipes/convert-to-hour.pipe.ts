import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToHour'
})
export class ConvertToHourPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    // tslint:disable-next-line: radix
    return value + ' óra - ' + (value + 1) + ' óra';
  }
}
