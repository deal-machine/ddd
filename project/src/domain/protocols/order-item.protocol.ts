export type OrderItemConstructor = {
  id: string;
  name: string;
  price: number;
};

export type OrderItemAttributes = {
  id: string;
  name: string;
  price: number;
};

export interface IOrderItem {
  toString(): string;
  increaseValue(value: number): number;
}
