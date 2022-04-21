import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/product-list-reducer';

const productListState = createFeatureSelector<State>('productsState');

export const getProductList = createSelector(productListState, (state) =>
  state.productList.slice(state.startIndex, state.endIndex)
);

export const getProductCount = createSelector(
  productListState,
  (state) => state.productList.length
);
