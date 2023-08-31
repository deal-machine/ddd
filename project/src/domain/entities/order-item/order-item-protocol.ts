export type OrderItemConstructor = {
  id: string;
  name: string;
  price: number;
  productId: string;
  quantity: number;
};

export type OrderItemAttributes = {
  id: string;
  name: string;
  price: number;
  productId: string;
  quantity: number;
};

export interface IOrderItem {
  increaseValue(value: number): number;
  getPrice(): number;
  getProductId(): string;
  getQuantity(): number;
}
