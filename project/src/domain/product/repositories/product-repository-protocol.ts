import { RepositoryInterface } from "../../../@shared/repositories/repository-protocol";
import { Product } from "../entities/product";

export interface ProductRepository extends RepositoryInterface<Product> {
  findAllByCategory(category: string): Promise<Product[]>;
}
