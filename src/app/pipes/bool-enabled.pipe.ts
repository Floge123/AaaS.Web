import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolEnabled',
  pure: false
})
export class BoolEnabledPipe implements PipeTransform {

  transform(value: boolean): any {
    return value ? 'Enabled' : 'Disabled';
  }
}
