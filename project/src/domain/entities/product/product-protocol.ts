export type ProductConstructor = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
};

export interface IProduct {
  increaseValue(value: number): number;
  getId(): string;
  getName(): string;
  getDescription(): string;
  getCategory(): string;
  getPrice(): number;
}
