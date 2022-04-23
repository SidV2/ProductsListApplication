import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PageIndex, Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list-ui',
  templateUrl: './product-list-ui.component.html',
  styleUrls: ['./product-list-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListUiComponent implements OnInit {

  @Input() productList: Product[];
  @Input() productCount: number;
  @Output() pageChangeEvent = new EventEmitter<PageIndex>();

  ngOnInit(): void {
  }

  constructor(private router: Router) {
    this.productList = [];
    this.productCount = 0;
  }

  onPageChange(paginator: PageEvent) {
    const startIndex = paginator.pageIndex * paginator.pageSize;
    let endIndex = startIndex + paginator.pageSize;
    if (endIndex > this.productCount) endIndex = this.productCount;
    this.pageChangeEvent.emit({ startIndex, endIndex });
  }

  /*Part of the onPush change detection experiment 
    Please comment out 'changeDetection: ChangeDetectionStrategy.OnPush'
    You will see that child change will be triggered with every parent change
  */
  childchNgeTrigger(): void {
    console.log("child change triggered");
  }

  openProductDetail(id: number): void {
    this.router.navigate(['/productdetail', id]);
  }

}
