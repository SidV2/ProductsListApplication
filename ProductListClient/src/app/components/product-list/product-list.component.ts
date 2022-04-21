import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../models/product';
import { ProductListService } from './product-list.service';
import { Store } from '@ngrx/store';
import * as ProductListPageActions from '../../store/actions/product-list-page.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(
    private productListService: ProductListService,
    private snackBar: MatSnackBar,
    private store: Store<any>) {
  }

  productList: Product[] = [];
  paginatedProductsList$?: Observable<Product[]>;

  ngOnInit(): void {
    this.getProductsList();
    this.paginatedProductsList$ = this.store.select((store) => store.products.paginatedProductList);
  }

  getProductsList(): void {
    this.productListService.getProductList().subscribe(
      (data) => {
        this.productList = data;
        console.log(this.productList);
        this.store.dispatch(ProductListPageActions.productsLoaded({ productsList: data }));
      },
      (error) => { //Error callback
        this.store.dispatch(ProductListPageActions.productsLoadedFailure({ productsList: [] }));
        this.snackBar.open('API failed to get data', 'OK', {});
      }
    );
  }

  onPageChange(paginator: PageEvent): void {
    const startIndex = paginator.pageIndex * paginator.pageSize;
    let endIndex = startIndex + paginator.pageSize;
    if (endIndex > this.productList.length) endIndex = this.productList.length;
    this.store.dispatch(ProductListPageActions.userClickedOnPaginationNavigation({ startIndex: startIndex, endIndex: endIndex }))
  }

}

