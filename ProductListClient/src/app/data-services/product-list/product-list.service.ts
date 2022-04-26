import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product';

/**
 * @author Sidhartha Verma
 * Service calling the random coffee API of batch size 50
 */
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
