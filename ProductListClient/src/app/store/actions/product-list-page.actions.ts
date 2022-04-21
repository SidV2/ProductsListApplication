import { createAction, props } from "@ngrx/store";
import { Product } from "../../models/product";

export const productListInit = createAction(
    '[Products Page] Init product page'
);

export const productsLoaded = createAction(
    '[Products Page] Products API Loaded Successfully',
    props<{ productsList: Product[] }>()
);

export const productsLoadedFailure = createAction(
    '[Products Page] Products API Failure',
    props<{ error: string }>()
);

export const userClickedOnPaginationNavigation = createAction(
    '[Products Page] User Click on Pagination',
    props<{startIndex: number, endIndex: number}>()
);
