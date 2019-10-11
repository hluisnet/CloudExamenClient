import { EntityModel } from "../Entity";

export class ProductModel extends EntityModel {
    name: string;
    description: string;
    weight: number;
    price: number;
  
    constructor(product) {
      super(product);
      this.name = product.name || '';
      this.description = product.description || '';
      this.weight = product.weight || null;
      this.price = product.price || null;
    }
  }