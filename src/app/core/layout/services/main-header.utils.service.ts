import { Injectable } from '@angular/core';
import { ButtonItem } from '../models/main-header';

@Injectable({
  providedIn: 'root',
})
export class MainHeaderUtilsService {

  headerBtnsList: ButtonItem[] = []

  constructor() {
    this.headerBtnsList = [
      {label: "EUR-USD Details" , customCss: "details-btn" , url : 'exchanger/EURUSD'},
      {label: "EUR-GBP Details" , customCss: "details-btn" , url : 'exchanger/EURGBP'},
    ]
  }


}
