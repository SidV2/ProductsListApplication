import { createReducer, on } from '@ngrx/store';
import * as productListPageActions from '../actions/product-list-page.actions';
import { PageIndex, Product } from '../../models/product';
import * as productDetailPageActions from '../actions/product-detail-page.actions';

export interface State extends PageIndex {
  productList: Product[];
}

export const initialState: State = {
  productList: [],
  startIndex: 0,
  endIndex: 10,
};

export const productsReducer = createReducer(
  initialState,
  on(productListPageActions.productsLoaded, (state, action) => {
    return {
      ...state,
      productList: action.productsList,
    };
  }),
  on(productListPageActions.productsLoadedFailure, (state) => {
    return {
      ...state,
      productList: [],
    };
  }),
  on(productListPageActions.userClickedOnPaginationNavigation, (state, action) => {
    return {
      ...state,
      startIndex: action.startIndex,
      endIndex: action.endIndex,
    };
  }),
  on(productDetailPageActions.productDetailBackNavigation, (state, action) => {
    return {
      ...state,
      startIndex: 0,
      endIndex: 10,
    };
  })
);
