import { Injectable, Inject } from '@angular/core';

import { ManagerBaseService } from '../services/manager-base.service';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/Product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ManagerBaseService<ProductModel> {

  constructor(
    @Inject('API_URL') apiUrl: string,
    http: HttpClient
  ) {
    super(apiUrl, 'product', http);
  }
}
