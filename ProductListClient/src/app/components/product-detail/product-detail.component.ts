import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { product } from 'src/app/store/selectors/product-detail.selector';
import * as ProductDetailPageActions from '../../store/actions/product-detail-page.actions'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product> = this.store.select(product);  
  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {}
  recordAction(backFromProductDetail: boolean): void {
    this.store.dispatch(ProductDetailPageActions.productDetailBackNavigation({backFromProductDetail: backFromProductDetail}));
  }
 }
