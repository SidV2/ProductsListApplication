import { TestBed } from '@angular/core/testing';
import { ProductListService } from './product-list.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { dummyProductListResponse } from './product-list-service-mock';

describe('ProductListService', () => {
  let productListservice: ProductListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductListService],
    });
    productListservice = TestBed.inject(ProductListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(productListservice).toBeTruthy();
  });

  it('getproductList() should return data', () => {
    productListservice.getProductList().subscribe((data) => {
      expect(data).toEqual(dummyProductListResponse);
    });
    const req = httpMock.expectOne('https://random-data-api.com/api/coffee/random_coffee?size=50');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProductListResponse);
  });

});
