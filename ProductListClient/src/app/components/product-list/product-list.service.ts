import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  constructor(private http: HttpClient) { }

  getProductList() {
    return this.http.get<Product[]>('https://random-data-api.com/api/coffee/random_coffee?size=50');
  }

}