import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { fromObservable } from "../lib";
import { BACKEND_API, IProductsAPIResponse, IProduct } from "../models";

export const productsApiResponseDATA: IProductsAPIResponse = {
  products: [] as IProduct[],
  total: 0,
  limit: 10,
  skip: 0,
};

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private _http = inject(HttpClient);
  private _backend_url = inject(BACKEND_API);

  getProducts(page: number = 0, limit: number = 5) {
    const skip = page * limit;

    console.log(page, skip, limit);

    const response$ = this._http.get<IProductsAPIResponse>(
      `${this._backend_url}/auth/products?skip=${skip}&limit=${limit}`,
      {
        reportProgress: false,
      }
    );

    const responseSignal = fromObservable(response$, productsApiResponseDATA);
    return responseSignal;
  }

  getProductById(id: number) {
    const product$ = this._http.get<IProduct>(
      `${this._backend_url}/auth/products/${id}`,
      {
        reportProgress: false,
      }
    );

    const responseSignal = fromObservable(product$, {} as IProduct);
    return responseSignal;
  }
}
