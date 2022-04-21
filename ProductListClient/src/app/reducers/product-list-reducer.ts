import { createReducer, on } from "@ngrx/store";
import { productsLoaded, productsLoadedFailure, userClickedOnPaginationNavigation } from "../components/product-list/actions/product-list-page.actions";
import { Product } from "../components/product-list/product";
import { State } from "../models/appstate";

export const initialState: State = {
    productsList: [],
    paginatedProductList: []
}

export const productsReducer = createReducer(
    initialState,
    on(productsLoaded, (state, action) => {
        return {
            ...state,
            productsList: action.productsList,
            paginatedProductList: filterData(action.productsList, 0, 10)
        }
    }),
    on(productsLoadedFailure, (state, action) => {
        return {
            ...state,
            productsList: action.productsList,
            paginatedProductList: action.productsList
        }
    }),
    on(userClickedOnPaginationNavigation, (state, action) => {
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