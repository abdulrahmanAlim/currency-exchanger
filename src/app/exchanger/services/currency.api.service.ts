import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {
  private currencyData = '../../../assets/DATA_MOCK.json';
  baseUrl = environment.apiUrl
  constructor(private httpClient: HttpClient) {}

   getCurrencyNames() {
    const params = new HttpParams()
        .set('access_key', environment.accessKey)
    const url = `${this.baseUrl}/symbols`
    return this.httpClient.get(url , {params})
   }

   getHistoricalRates() {
    return this.httpClient.get(this.currencyData)
   }
}
