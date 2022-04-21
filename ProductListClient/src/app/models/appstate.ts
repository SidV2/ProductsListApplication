import { Product } from "./product";

export interface State {
    productsList: Product[],
    paginatedProductList: Product[]
}