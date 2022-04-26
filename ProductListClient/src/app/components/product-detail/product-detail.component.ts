import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { product } from 'src/app/store/selectors/product-detail.selector';
import * as ProductDetailPageActions from '../../store/actions/product-detail-page.actions'
/**
 * @author Sidhartha Verma
 * Product Detail Component
 * Shows individual product
 */
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {
  /**
   * Observable containing the single product
   * Uses the selector product 
   */
  product$: Observable<Product> = this.store.select(product);
  constructor(
    private store: Store
  ) { }
  ngOnInit(): void { }
  /**
   * @param backFromProductDetail 
   * Travel back to product list and
   * dispatch the productDetailBackNavigation which controls the flag to call PRoduct List API
   */ 
  recordAction(backFromProductDetail: boolean): void {
    this.store.dispatch(ProductDetailPageActions.productDetailBackNavigation({ backFromProductDetail: backFromProductDetail }));
  }
}
