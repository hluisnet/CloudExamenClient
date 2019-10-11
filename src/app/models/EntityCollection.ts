export class EntityCollectionModel {
    ids: number[];
    constructor(entityCollection) {
      this.ids = entityCollection.ids || [];
    }
  }
  