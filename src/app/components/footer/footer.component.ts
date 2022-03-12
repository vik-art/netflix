import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
//  private _name = "";

//  @Input() set name(data) {
//    console.log(data)
//    this._name = data;
 // }
 // get name() {
 //   return this._name;
 // }
  
  //map, SwitchMap, concatMap, mergeMap, takeUntill, takeLast, takeWhile, take, filter
  // combineLatest, forkJoin, fromEvent, of

  constructor() { }

 // ngOnChanges(changes: SimpleChanges): void {
  //  console.log("Onchanges", changes)
 // }

 // ngOnInit(): void {
//    console.log(this.name)
//  }

}
