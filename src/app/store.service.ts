import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private data: BehaviorSubject<any>;
  data$: Observable<any>;

  constructor() {
    this.data = new BehaviorSubject({
      settingOne: 'Initial Value',
      settingTwo: 'jack',
      settingThree: true
    });

    this.data$ = this.data.asObservable();
  }

  update(value: any): void {
    this.data.next(value);
  }
}
