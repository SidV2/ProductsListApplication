import { routerReducer } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { productsReducer } from '../reducers/product-list-reducer';

/**
 * @author Sidhartha Verma
 * Meta reducer to compose map of reducers
 * Reducer 1: productsReducer
 * Reducer 2: routerReducer, which is internally available in ngRx Store
 */
export const reducers: ActionReducerMap<any> = {
    productsState: productsReducer,
    router: routerReducer
};

const debug = (reducer: ActionReducer<any>): ActionReducer<any> => {
    return (state, action) => {
        return reducer(state, action);
    };
};

export const metaReducers: MetaReducer<any>[] = [debug];
