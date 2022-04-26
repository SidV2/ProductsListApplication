import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { ProductListDispatcher } from 'src/app/store/dispatcher/product-list-dispatcher';
import { PageIndex, Product } from 'src/app/models/product';

/**
 * @author: Sidhartha Verma
 * Product List Component
 * Contains logic to pass observables productList$ and productCount$ to product-list-ui
 * for display
 */
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  /**
   * Subject passed as a notifier to takeUntil function 
   * ends the original source observable when the destroy$ observable emits a value
   */
  destroy$ = new Subject();
  /**
   * Product Count Observable 
   * Passed to product-list-ui component to handle pagination configs
   */
  productCount$: Observable<number> = this.productListDispatcher.productCount$;
  /**
   * Product List Observable
   * Passed to product-list-ui component to show the actual product list coffee items
   */
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
  /** 
   * Emitted onPageChange event from child 
   * Captures the current start and end index of the page
  */
  onPageChange({ startIndex, endIndex }: PageIndex): void {
    this.productListDispatcher.onPageChange({ startIndex, endIndex });
  }
  /**
   * Subscribes to the productListFailure$ observable of the product list dispatcher
   * Shows error if error is emitted from the source observable
   */
  subscribeError(): void {
    this.productListDispatcher.productListFailure$
      .pipe(takeUntil(this.destroy$))
      .subscribe((error: string) => {
        this.snackBar.open(error, 'OK', {});
      });
  }
  /**
   * Called on component destroy
   * Internal by Angular
   */
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
