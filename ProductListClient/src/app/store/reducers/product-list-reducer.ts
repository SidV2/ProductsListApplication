import { createReducer, on } from '@ngrx/store';
import * as productListPageActions from '../actions/product-list-page.actions';
import { PageIndex, Product } from '../../models/product';
import * as productDetailPageActions from '../actions/product-detail-page.actions';

/**
 * @author Sidhartha Verma
 * Main Products List Reducer
 * Handles the state of Product List used in the application
 */


/**
 * Interface State model
 */
export interface State extends PageIndex {
  productList: Product[];
}

/**
 * Initial state of the productsState
 */
export const initialState: State = {
  productList: [],
  startIndex: 0,
  endIndex: 10,
};

/**
 * productsReducer
 * Listens to actions from product-list and product-detail component
 * Returns a new state after a certain action is processed
 */
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
