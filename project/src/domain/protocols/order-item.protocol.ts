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
  increaseValue(value: number): number;
  getPrice(): number;
  toString(): string;
}
