import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'runtimePipe'
})
export class RuntimePipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
