export abstract class BaseRepository<Entity> {
  abstract findAll(): Promise<Entity[]>;

  abstract findById(id: number): Promise<Entity | null>;

  abstract create(data: Omit<Entity, 'id'>): Promise<void>;

  abstract update(id: number, data: Partial<Entity>): Promise<void>;

  abstract delete(id: number): Promise<void>;
}
