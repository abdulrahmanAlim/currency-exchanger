import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {
  baseUrl = environment.apiUrl
  constructor(private httpClient: HttpClient) {}

   getCurrencyNames() {
    let params = new HttpParams()
        .set('access_key', environment.accessKey)
    const url = `${this.baseUrl}/symbols`
    return this.httpClient.get(url , {params})
   }
}
