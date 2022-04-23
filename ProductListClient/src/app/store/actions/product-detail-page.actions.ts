import { createAction, props } from "@ngrx/store";
import { Product } from "../../models/product";

export const productDetailBackNavigation = createAction(
    '[Products Page] User Click on back on Detail Page',
    props<{ backFromProductDetail: boolean }>()
);