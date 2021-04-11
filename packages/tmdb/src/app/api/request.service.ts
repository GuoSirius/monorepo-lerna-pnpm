import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestService {

  constructor(protected httpClient: HttpClient, protected httpParams: HttpParams) {}
}
