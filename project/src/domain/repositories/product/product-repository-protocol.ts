import { Product } from "../../entities";
import { RepositoryInterface } from "../repository-protocol";

export default interface ProductRepository
  extends RepositoryInterface<Product> {}
