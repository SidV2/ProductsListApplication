import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProductListDispatcher } from 'src/app/store/dispatcher/product-list-dispatcher';
import { PageIndex, Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  destroy$ = new Subject();
  productCount$: Observable<number> = this.productListDispatcher.productCount$;
  productList$: Observable<Product[]> = this.productListDispatcher.productList$;

  constructor(
    private snackBar: MatSnackBar,
    private productListDispatcher: ProductListDispatcher) {
  }

  ngOnInit(): void {
    this.productListDispatcher.init();
    this.subscribeError();
  }

  onPageChange({ startIndex, endIndex }: PageIndex): void {
    this.productListDispatcher.onPageChange({ startIndex, endIndex });
  }

  subscribeError() {
    this.productListDispatcher.productListFailure$
      .pipe(takeUntil(this.destroy$))
      .subscribe((error: string) => {
        this.snackBar.open(error, 'OK', {});
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

}

