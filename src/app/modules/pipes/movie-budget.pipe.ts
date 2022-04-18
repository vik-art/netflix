import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieBudget'
})
export class MovieBudgetPipe implements PipeTransform {

  transform(value: number): string {
    return value.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
  }

}
