export interface Mapper<Generic> {
  map(entity: Parial<Generic> & { id: number }): Generic;

  mapAll(entities: (Parial<Generic> & { id: number })[]): Generic[];
}
