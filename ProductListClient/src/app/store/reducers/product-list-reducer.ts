import { createReducer, on } from '@ngrx/store';
import * as productListActions from '../actions/product-list-page.actions';
import { PageIndex, Product } from '../../models/product';

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
  on(productListActions.productsLoaded, (state, action) => {
    return {
      ...state,
      productList: action.productsList,
    };
  }),
  on(productListActions.productsLoadedFailure, (state) => {
    return {
      ...state,
      productList: [],
    };
  }),
  on(productListActions.userClickedOnPaginationNavigation, (state, action) => {
    return {
      ...state,
      startIndex: action.startIndex,
      endIndex: action.endIndex,
    };
  })
);
