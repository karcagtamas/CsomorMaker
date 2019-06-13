import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isReady'
})
export class IsReadyPipe implements PipeTransform {
  transform(value: boolean, args?: any): any {
    return value ? 'Naprakész' : 'Generálásra vár';
  }
}
