import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PageIndex, Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list-ui',
  templateUrl: './product-list-ui.component.html',
  styleUrls: ['./product-list-ui.component.scss']
})
export class ProductListUiComponent implements OnInit {

  @Input() productList: Product[];
  @Input() productCount: number;
  @Output() pageChangeEvent = new EventEmitter<PageIndex>();
  
  ngOnInit(): void {
  }

  constructor() {
    this.productList = [];
    this.productCount = 0;
  }

  onPageChange(paginator: PageEvent) {
    const startIndex = paginator.pageIndex * paginator.pageSize;
    let endIndex = startIndex + paginator.pageSize;
    if (endIndex > this.productCount) endIndex = this.productCount;
    this.pageChangeEvent.emit({ startIndex, endIndex });
  }
}
