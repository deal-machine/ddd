import { RepositoryInterface } from "../../../@shared/repositories/repository-protocol";
import { Order } from "../entities/order";

export interface OrderRepository extends RepositoryInterface<Order> {}
