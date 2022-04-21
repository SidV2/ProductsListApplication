import { createReducer, on } from "@ngrx/store";
import * as ProductsListPageActions from "../actions/product-list-page.actions";
import { Product } from "../../models/product";
import { State } from "../../models/appstate";

export const initialState: State = {
    productsList: [],
    paginatedProductList: []
}

export const productsReducer = createReducer(
    initialState,
    on(ProductsListPageActions.productsLoaded, (state, action) => {
        return {
            ...state,
            productsList: action.productsList,
            paginatedProductList: filterData(action.productsList, 0, 10)
        }
    }),
    on(ProductsListPageActions.productsLoadedFailure, (state, action) => {
        return {
            ...state,
            productsList: action.productsList,
            paginatedProductList: action.productsList
        }
    }),
    on(ProductsListPageActions.userClickedOnPaginationNavigation, (state, action) => {
        return {
            ...state,
            paginatedProductList: filterData(state.productsList, action.startIndex, action.endIndex)
        }
    })
)

//helper functions
function filterData(productsList: Product[], startIndex: number, endIndex: number): Product[] {
    return productsList.slice(startIndex, endIndex);
}