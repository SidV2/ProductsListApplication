import { createAction, props } from "@ngrx/store";
import { Product } from "../../models/product";

/**
 * @author Sidhartha Verma
 * Action of product detail component
 */
export const productDetailBackNavigation = createAction(
    '[Products Page] User Click on back on Detail Page',
    props<{ backFromProductDetail: boolean }>()
);
