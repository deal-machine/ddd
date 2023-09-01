export interface RepositoryInterface<T> {
  create(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
  update(id: string, entity: Partial<T>): Promise<void>;
  findOne(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
}
