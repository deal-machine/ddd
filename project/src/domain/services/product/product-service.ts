import { IncreaseValueParams } from "./product-service-protocol";

export class ProductService {
  static increaseValue({ products, value }: IncreaseValueParams): void {
    products.forEach((product) => product.increaseValue(value));
  }
}
