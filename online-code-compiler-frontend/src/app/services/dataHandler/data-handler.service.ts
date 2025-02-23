import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import {map, Observable} from 'rxjs';
import { IExecuteCodeRequest } from '../../interfaces/request.interface';
import { ILanguage } from '../../interfaces/editor-specific.interface';
import { IExecuteCodeResponse } from '../../interfaces/response.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  private baseUrl: string;

  constructor(private httpService: HttpService) {
    this.baseUrl = environment.baseUrl;
  }

  public getSupportedLanguages(): Observable<ILanguage[]> {
    return this.httpService.get(`${this.baseUrl}/getLangs`).pipe( map((response) => response.data));
  }

  public executeCode(requestBody: IExecuteCodeRequest): Observable<IExecuteCodeResponse> {
    return this.httpService.post(`${this.baseUrl}/executeCode`, requestBody).pipe( map((response) => (response as any).result));
  }

}
