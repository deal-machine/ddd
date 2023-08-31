export type ProductConstructor = {
  id: string;
  name: string;
  description: string;
  category: string;
};

export interface IProduct {
  getId(): string;
  getName(): string;
  getDescription(): string;
  getCategory(): string;
}
