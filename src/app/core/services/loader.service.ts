import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor() {}
  isLoading = new Subject<boolean>();
  show() {
    setTimeout(() => {
      this.isLoading.next(true);
    }, 1);
  }
  hide() {
    setTimeout(() => {
      this.isLoading.next(false);
    }, 1);
  }
}
