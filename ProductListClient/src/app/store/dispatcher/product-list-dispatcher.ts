import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { PageIndex, Product } from '../../models/product';
import * as ProductListPageActions from '../actions/product-list-page.actions';
import {
  getProductCount,
  getProductList,
} from '../selectors/product-list.selectors';

@Injectable({ providedIn: 'root' })
export class ProductListDispatcher {
  productList$: Observable<Product[]> = this.store.select(getProductList);
  productCount$: Observable<number> = this.store.select(getProductCount);
  productListFailure$ = this.actions.pipe(
    ofType(ProductListPageActions.productsLoadedFailure),
    map(({ error }) => error)
  );

  constructor(private store: Store, private actions: Actions) {}

  init() {
    this.store.dispatch(ProductListPageActions.productListInit());
  }

  onPageChange({ startIndex, endIndex }: PageIndex) {
    this.store.dispatch(
      ProductListPageActions.userClickedOnPaginationNavigation({
        startIndex,
        endIndex,
      })
    );
  }
}