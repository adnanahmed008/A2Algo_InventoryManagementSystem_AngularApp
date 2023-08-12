import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from "@angular/common/http";
import { IProduct } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImsApiService {
  private baseUrl: string = `http://192.168.10.25:5168`;

  constructor(
    private http: HttpClient
  ) { }

  getProducts() : Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/products`);
  }
}
