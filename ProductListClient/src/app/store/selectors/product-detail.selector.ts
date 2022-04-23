import { createSelector } from '@ngrx/store';
import { Product } from 'src/app/models/product';
import { getProductList } from './product-list.selectors';
import { selectRouteParams } from './router.selectors';

export const product = createSelector(
    getProductList,
    selectRouteParams,
    (productList: Product[], { id }) => {
        return productList.filter((product) => product.id === Number(id))[0];
    }
);