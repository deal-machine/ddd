import { Product } from "../../entities";
import { RepositoryInterface } from "../repository-protocol";

export interface ProductRepository extends RepositoryInterface<Product> {
  findAllByCategory(category: string): Promise<Product[]>;
}
