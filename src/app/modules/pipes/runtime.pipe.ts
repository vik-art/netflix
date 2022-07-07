import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'runtime',
})
export class RuntimePipe implements PipeTransform {
  transform(value: number): string {
    const hour = Math.floor(value / 60);
    const min = value - hour * 60;
    return `${hour}h ${min}min`;
  }
}
