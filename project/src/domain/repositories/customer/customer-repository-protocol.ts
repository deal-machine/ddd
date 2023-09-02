import { Customer } from "../../entities";
import { RepositoryInterface } from "../repository-protocol";

export interface CustomerRepository extends RepositoryInterface<Customer> {}
