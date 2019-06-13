import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isLocked'
})
export class IsLockedPipe implements PipeTransform {
  transform(value: boolean, args?: any): any {
    return value ? 'Zárolva' : 'Nyitott';
  }
}
