import { RepositoryInterface } from "../../../@shared/repositories/repository-protocol";
import { Customer } from "../entities/customer";

export interface CustomerRepository extends RepositoryInterface<Customer> {}
