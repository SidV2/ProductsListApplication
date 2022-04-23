import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, Observable, subscribeOn } from 'rxjs';
import { PageIndex, Product } from '../../models/product';
import * as ProductListPageActions from '../actions/product-list-page.actions';
import * as ProductDetailPageActions from '../actions/product-detail-page.actions'
import {
  getProductCount,
  getProductList,
} from '../selectors/product-list.selectors';

@Injectable({ providedIn: 'root' })
export class ProductListDispatcher {
  productList$: Observable<Product[]> = this.store.select(getProductList);
  productCount$: Observable<number> = this.store.select(getProductCount);
  
  productListFailure$: Observable<string> = this.actions.pipe(
    ofType(ProductListPageActions.productsLoadedFailure),
    map(({ error }) => error)
  );
  
  callProductListApi: boolean = true;
  
  backFromProductDetail$: Observable<boolean> = this.actions.pipe(
    ofType(ProductDetailPageActions.productDetailBackNavigation),
    map(({ backFromProductDetail }) => backFromProductDetail)
  )

  constructor(private store: Store, private actions: Actions) { }

  init() {
    this.backFromProductDetail$.subscribe((data) => {
      if (data) this.callProductListApi = false;
    });
    if (this.callProductListApi) this.store.dispatch(ProductListPageActions.productListInit());
  }

  onPageChange({ startIndex, endIndex }: PageIndex): void {
    this.store.dispatch(
      ProductListPageActions.userClickedOnPaginationNavigation({
        startIndex,
        endIndex,
      })
    );
  }
}