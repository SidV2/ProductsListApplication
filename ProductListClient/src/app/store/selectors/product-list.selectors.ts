import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/product-list-reducer';

/**
 * @author Sidhartha Verma
 * Reads the "productsState" state to compose selectors
 */
const productListState = createFeatureSelector<State>('productsState');

/**
 * Return the product list available inside the productsState
 * Slices them to have a paginated array to show on each page
 */
export const getProductList = createSelector(productListState, (state) =>
  state.productList.slice(state.startIndex, state.endIndex)
);

/**
 * Product Count selector to the return the total number of products available in store
 * Used for pagination control
 */
export const getProductCount = createSelector(
  productListState,
  (state) => state.productList.length
);
