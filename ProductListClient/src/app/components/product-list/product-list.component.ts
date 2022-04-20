import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  paginatedProductList: Product[] = [];

  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList(): void {
    this.productListService.getProductList().subscribe(
      (data) => {
        this.productList = data;
        console.log(this.productList);
        this.initInitialProductList();
      },
      (error) => { //Error callback
        this.snackBar.open('API failed to get data', 'OK', {
        });
      }
    );
  }

  initInitialProductList(): void {
    this.paginatedProductList = this.productList.slice(0, 10);
  }

  onPageChange(paginator: PageEvent): void {
    const startIndex = paginator.pageIndex * paginator.pageSize;
    let endIndex = startIndex + paginator.pageSize;
    if (endIndex > this.productList.length) endIndex = this.productList.length;
    this.paginatedProductList = this.productList.slice(startIndex, endIndex);
  }

}
