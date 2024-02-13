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

   latestRates(baseCurrency:string){
    const params = new HttpParams()
    .set('access_key', environment.accessKey)
    .set('base', baseCurrency )
    const url = `${this.baseUrl}/latest`
    return this.httpClient.get(url, {params})
   }
}
