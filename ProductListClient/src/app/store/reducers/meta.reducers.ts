import { routerReducer } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { productsReducer } from '../reducers/product-list-reducer';

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