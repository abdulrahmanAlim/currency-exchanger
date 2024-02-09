import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConverterApiService {
  baseUrl = environment.apiUrl
  constructor(private httpClient: HttpClient) {

   }

   latestRates(){
    let params = new HttpParams()
    .set('access_key', environment.accessKey)
    .set('base', environment.defaultCurrency)
    const url = `${this.baseUrl}/latest?access_key=${environment.accessKey}
    &base=${environment.defaultCurrency}`
    return this.httpClient.get(url, {params})
   }

  //  convertRequest(convertItem: ConverterItem) {
  //   let params = new HttpParams()
  //       .set('access_key', environment.accessKey)
  //       .set('from', convertItem.from)
  //       .set('to', convertItem.to)
  //       .set('amount', convertItem.amount)
  //   const url = `${this.baseUrl}/convert`

  //   return this.httpClient.get(url , {params})
  //  }
}
