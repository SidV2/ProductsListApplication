import { Product } from "../components/product-list/product";

export interface State {
    productsList: Product[],
    paginatedProductList: Product[]
}