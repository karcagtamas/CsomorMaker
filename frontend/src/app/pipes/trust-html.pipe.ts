import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'trustHTML'
})
export class TrustHTMLPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    value = value.replace(/¨/g, '¨T');
    value = value.replace(/\$/g, '¨D');
    value = value.replace(/\r\n/g, '\n');
    value = value.replace(/\r/g, '\n');
    value = value.replace(/\u00A0/g, '&nbsp;');
    value = value.replace(/^[ \t]+$/gm, '');
    value = value.split('\n').join('<br />');
    return value;
  }
}
