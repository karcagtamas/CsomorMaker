import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatDate'
})
export class ChatDatePipe implements PipeTransform {
  transform(value: string, args?: any): any {
    const now = new Date();
    const message = new Date(value);
    const valueInHour = this.toHour(now.valueOf()) - this.toHour(message.valueOf());
    if (Math.floor(valueInHour) <= 23) {
      return `${Math.floor(valueInHour)} órája`;
    }
    if (Math.floor(valueInHour / 24) <= 30) {
      return `${Math.floor(valueInHour / 24)} napja`;
    }
    if (Math.floor(valueInHour / 24 / 30) < 12) {
      return `${Math.floor(valueInHour / 24 / 30)} hónapja`;
    }
    if (Math.floor(valueInHour / 24 / 30 / 12) >= 1) {
      return `${Math.floor(valueInHour / 24 / 30 / 12)} éve`;
    }
    return null;
  }

  toHour(value: number) {
    return value / 1000 / 3600;
  }
}
