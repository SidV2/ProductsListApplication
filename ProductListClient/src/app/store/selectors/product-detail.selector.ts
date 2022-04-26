import { createSelector } from '@ngrx/store';
import { Product } from 'src/app/models/product';
import { getProductList } from './product-list.selectors';
import { selectRouteParams } from './router.selectors';

/**
 * @author Sidhartha Verma
 * Uses routerSelectors to get route params
 * Uses getProductList to compose product detail to return product based on the id
 * Uses Memoization concept which uses exisiting selectors to compose new selectors
 */
export const product = createSelector(
    getProductList,
    selectRouteParams,
    (productList: Product[], { id }) => {
        return productList.filter((product) => product.id === Number(id))[0];
    }
);
