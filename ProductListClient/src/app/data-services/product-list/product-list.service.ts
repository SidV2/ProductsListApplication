import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  batchSize = 50;
  apiURL = `https://random-data-api.com/api/coffee/random_coffee?size=${this.batchSize}`

  constructor(private http: HttpClient) { }

  getProductList() {
    return this.http.get<Product[]>(this.apiURL);
  }

}