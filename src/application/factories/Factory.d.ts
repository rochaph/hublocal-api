export default interface Factory<Entity> {
  create(args: Partial<Entity> | Record<string, any>): Promise<Entity> | Entity;
}
