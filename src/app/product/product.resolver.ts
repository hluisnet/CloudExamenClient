import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Inject, Injectable } from "@angular/core";
import { ProductService } from "./product.service";
import { Observer } from "rxjs";
import { ProductModel } from "../models/Product/product";
@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<any> {
    
    constructor(
      // @Inject(ProductService)
      private productService: ProductService
    ) { }
  
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observer<any> {
      return this.productService.getElements();
    }
  }