export type OrderItemConstructor = {
  id: string;
  name: string;
  price: number;
  productId: string;
  quantity: number;
};

export interface IOrderItem {
  get id(): string;
  get name(): string;
  get price(): number;
  get productId(): string;
  get quantity(): number;
  total(): number;
}
