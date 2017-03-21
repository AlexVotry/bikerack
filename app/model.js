'use strict';

import Db from './db';

class Model {
  constructor(collection) {
    this.db = new Db();
    this.collection = this.db.get().collection(collection);
  }

  all() {
    return this.collection.find().toArray();
  }

  createOne(doc) {
    return this.collection.insertOne(doc);
  }
  createMany(docs) {
    return this.collection.insertMany(docs);
  }

  findMany(queryObject) {
    return this.collection.find(queryObject).toArray();
  }

  findOne(queryObject) {
    return this.collection.findOne(queryObject);
  }

  drop(queryObject) {
    return this.collection.deleteOne(queryObject);
  }

  update(filterObject, updateObject) {
    return this.collection.findOneAndUpdate( filterObject, { $set: updateObject }, { returnOriginal: false });
  }
}

export { Model as default };
