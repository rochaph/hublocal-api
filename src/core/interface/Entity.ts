export default abstract class Entity {
  protected id?;

  get Id() {
    return this.id;
  }

  abstract equals(entity: Entity);
}
