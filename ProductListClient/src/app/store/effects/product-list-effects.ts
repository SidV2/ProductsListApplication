import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductListService } from '../../data-services/product-list/product-list.service';
import * as ProductListActions from '../actions/product-list-page.actions';

/**
 * @author Sidhartha Verma
 * Effect listening to action of type produtc list init
 * Upon receiving the action calls getProductList services 
 * which in turn calls the product list API
 * Retturns observable on either success or failure which is 
 * handled in component
 */
@Injectable()
export class ProductListEffects {
  $init = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductListActions.productListInit),
      switchMap(() =>
        this.productListService.getProductList().pipe(
          map((productList) =>
            ProductListActions.productsLoaded({ productsList: productList })
          ),
          catchError(() =>
            of(
              ProductListActions.productsLoadedFailure({ error: 'API failed to get data' })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productListService: ProductListService
  ) {}
}
