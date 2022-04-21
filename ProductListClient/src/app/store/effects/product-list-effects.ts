import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductListService } from '../../data-services/product-list/product-list.service';
import * as ProductListActions from '../actions/product-list-page.actions';

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
