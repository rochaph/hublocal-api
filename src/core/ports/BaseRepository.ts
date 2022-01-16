export interface BaseRepository<Entity> {
  findAll(): Entity[];

  findById(): Entity | null;

  create(data: Entity): Promise<void>;

  update(id: number, data: Partial<Entity>): Promise<void>;

  delete(id: number): Promise<void>;
}
