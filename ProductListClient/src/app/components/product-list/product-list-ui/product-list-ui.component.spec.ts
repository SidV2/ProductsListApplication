import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListUiComponent } from './product-list-ui.component';

describe('ProductListUiComponent', () => {
  let component: ProductListUiComponent;
  let fixture: ComponentFixture<ProductListUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
