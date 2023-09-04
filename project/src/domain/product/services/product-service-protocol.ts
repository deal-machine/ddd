import { Product } from "../entities/product";

export type IncreaseValueParams = {
  products: Product[];
  value: number;
};
