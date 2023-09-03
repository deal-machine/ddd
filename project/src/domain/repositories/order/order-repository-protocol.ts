import { Order } from "../../entities";
import { RepositoryInterface } from "../repository-protocol";

export interface OrderRepository extends RepositoryInterface<Order> {}
