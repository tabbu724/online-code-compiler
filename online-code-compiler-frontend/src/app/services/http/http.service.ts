import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private client: HttpClient) { }

  public get(url: string, headers?: HttpHeaders, params?: HttpParams): Observable<any> {
    try {
      return this.client.get(url, {headers, params}).pipe( map(result => result ));
    } catch (error) {
      console.log('error in get', error);
      throw error;
    }
  }

  public post(url: string, requestBody: object, headers?: HttpHeaders, params?: HttpParams) {
    try {
      return this.client.post(url, requestBody, {headers, params}).pipe(map(result => result));
    } catch (error) {
      console.log('error in post', error);
      throw error;
    }
  }
}
