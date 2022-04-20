import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from './product';
import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(
    private productListService: ProductListService,
    private snackBar: MatSnackBar) { }
  productList: Product[] = [];

  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList(): void {
    this.productListService.getProductList().subscribe(
      (data) => {
        this.productList = data;
        console.log(this.productList);
      },
      (error) => { //Error callback
        this.snackBar.open('API failed to get data', 'OK', {
        });
      }
    );
  }

}
