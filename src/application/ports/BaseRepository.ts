export abstract class BaseRepository<Entity> {
  abstract findAll(
    usuarioId: number,
    page?: number,
    limit?: number,
  ): Promise<Entity[]>;

  abstract findById(usuarioId: number, id: number): Promise<Entity | null>;

  abstract countByUsuario(usuarioId: number): Promise<number>;

  abstract create(data: Partial<Omit<Entity, 'id'>>): Promise<void>;

  abstract update(id: number, data: Partial<Omit<Entity, 'id'>>): Promise<void>;

  abstract delete(id: number): Promise<void>;
}
