export interface Mapper<Generic> {
  map(entity: Generic & { id: number }): Generic;

  mapAll(entities: (Generic & { id: number })[]): Generic[];
}
