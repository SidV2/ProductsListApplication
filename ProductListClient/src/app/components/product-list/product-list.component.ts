import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProductListDispatcher } from 'src/app/store/dispatcher/product-list-dispatcher';
import { PageIndex, Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {

  destroy$ = new Subject();
  productCount$: Observable<number> = this.productListDispatcher.productCount$;
  productList$: Observable<Product[]> = this.productListDispatcher.productList$;

  constructor(
    private snackBar: MatSnackBar,
    private productListDispatcher: ProductListDispatcher,
    private cdRef: ChangeDetectorRef) {
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
    this.destroy$.unsubscribe();
  }

  //simple experiment to verify that onpush change detection is currently working
  changeExperiment(): void {
    console.log('will fire change detection in parent');
    //this.cdRef.detach();
  }

  //part of the onPush experiment detects change in current component
  changeTriggeredinParent(): void {
    console.log('change in parent triggered');
  }

}

