export interface ProductAttributes {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
}

export interface ProductConstructor {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
}

export interface IProduct {
  get id(): string;
  get name(): string;
  get description(): string;
  get category(): string;
  get price(): number;
}
