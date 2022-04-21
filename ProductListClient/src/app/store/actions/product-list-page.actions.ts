import { createAction, props } from "@ngrx/store";
import { Product } from "../../models/product";

export const productsLoaded = createAction(
    '[Products Page] Products API Loaded Successfully',
    props<{ productsList: Product[] }>()
);

export const productsLoadedFailure = createAction(
    '[Products Page] Products API Failure',
    props<{ productsList: Product[] }>()
);

export const userClickedOnPaginationNavigation = createAction(
    '[Products Page] User Click on Pagination',
    props<{startIndex: number, endIndex: number}>()
);
