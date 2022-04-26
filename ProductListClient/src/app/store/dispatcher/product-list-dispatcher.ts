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

/**
 * @author Sidhartha Verma
 * Dispatcher class to dispatch actions on behalf of product-list component
 */
@Injectable({ providedIn: 'root' })
export class ProductListDispatcher {
  /**
   * Observable to get product list getProductList selector
   */
  productList$: Observable<Product[]> = this.store.select(getProductList);
  /**
   * Observable to get product count from getProductCount selector
   */
  productCount$: Observable<number> = this.store.select(getProductCount);
  /**
   * 
   */
  callProductListApi: boolean = true;
  /**
   * Listens to action of type productsLoadedFailure
   * Returns an observable in case of product list GET API failure
   * subscribed in the product-list component to read and show error message in Angular Material snackbar
   */
  productListFailure$: Observable<string> = this.actions.pipe(
    ofType(ProductListPageActions.productsLoadedFailure),
    map(({ error }) => error)
  );
  /**
   * Listens to actions of type productDetailBackNavigation which is basically
   * action fired when user return back from product detail page
   * In the above scenario product list API was being recalled which changed results of product list
   * This prevents API being recalled and will restore product list from the state of the application
   * Returns observable of type boolean
   */
  backFromProductDetail$: Observable<boolean> = this.actions.pipe(
    ofType(ProductDetailPageActions.productDetailBackNavigation),
    map(({ backFromProductDetail }) => backFromProductDetail)
  )
  constructor(private store: Store, private actions: Actions) { }
  /**
   * Basically being called from product-list component
   * Subscribes to backFromProductDetail observable and as per flag value 
   * decides to call the product List API
   * Flag value is set to true for the very first load and if user does not travel back from
   * product detail page API will be called
   */
  init() {
    this.backFromProductDetail$.subscribe((data) => {
      if (data) this.callProductListApi = false;
    });
    if (this.callProductListApi) this.store.dispatch(ProductListPageActions.productListInit());
  }
  /**
   * triggered by onPageChange in product-list component
   * Has the current page start and end index
   * uses the pagination inforamation to slice state and return paginated product list of 10
   */
  onPageChange({ startIndex, endIndex }: PageIndex): void {
    this.store.dispatch(
      ProductListPageActions.userClickedOnPaginationNavigation({
        startIndex,
        endIndex,
      })
    );
  }
}
