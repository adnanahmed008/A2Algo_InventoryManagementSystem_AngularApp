import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from "@angular/common/http";
import { IProduct } from '../interfaces/product';
import { Observable, timeout } from 'rxjs';
import { INewProduct, ISaleOrder } from '../interfaces';
import { IPurchase } from '../interfaces/purchase';
import { ISale } from '../interfaces/sale';
import { IProductNomenclature } from '../interfaces/product-nomenclature';
import { IPurchaseOrder } from '../interfaces/purchase-order';

@Injectable({
  providedIn: 'root'
})
export class ImsApiService {
  private baseUrl: string = `http://192.168.10.25:8000/api`;
  private timeout: number = 2000;

  constructor(
    private http: HttpClient
  ) { }

  // #region | Products |
  getProduct(id: string) {
    return this.http.get<IProduct>(`${this.baseUrl}/products/${id}`);
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/products`).pipe(
      timeout(this.timeout)
    );
  }

  getProductNomenclatures(): Observable<IProductNomenclature[]> {
    return this.http.get<IProductNomenclature[]>(`${this.baseUrl}/products/nomenclatures`).pipe(
      timeout(this.timeout)
    );
  }

  createProduct(product: INewProduct)
  {
    return this.http.post(`${this.baseUrl}/products`, product);
  }

  updateProduct(id: string, product: INewProduct)
  {
    return this.http.put(`${this.baseUrl}/products/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }
  // #endregion
  
  // #region | Purchases |
  getPurchases(): Observable<IPurchase[]> {
    return this.http.get<IPurchase[]>(`${this.baseUrl}/purchases`).pipe(
      timeout(this.timeout)
    );
  }

  getPurchasesByProductId(productId: string): Observable<IPurchase[]> {
    return this.http.get<IPurchase[]>(`${this.baseUrl}/purchases/${productId}`).pipe(
      timeout(this.timeout)
    );
  }

  createPurchaseOrder(purchaseOrder: IPurchaseOrder)
  {
    return this.http.post(`${this.baseUrl}/purchases/${purchaseOrder.ProductId}/${purchaseOrder.Quantity}`, null);
  }
  // #endregion

  // #region | Sales |
  getSales(): Observable<ISale[]> {
    return this.http.get<ISale[]>(`${this.baseUrl}/sales`).pipe(
      timeout(this.timeout)
    );
  }

  getSalesByProductId(productId: string): Observable<ISale[]> {
    return this.http.get<ISale[]>(`${this.baseUrl}/sales/${productId}`).pipe(
      timeout(this.timeout)
    );
  }

  createSaleOrder(saleOrder: ISaleOrder)
  {
    return this.http.post(`${this.baseUrl}/sales/${saleOrder.ProductId}/${saleOrder.Quantity}`, null);
  }
  // #endregion
}
