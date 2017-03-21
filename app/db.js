'use strict';

import { MongoClient as Mongo } from 'mongodb';

let singleton = null;

class Db {

  constructor() {
    singleton = singleton || this;

    this.db = null;
    this.url = process.env.DB_PATH + process.env.DB;

    return singleton;
  }

  connect() {
    let self = this;

    if (self.db) return Promise.resolve(self.db);

    return Mongo.connect(self.url)
      .then(function(dbo) {
        self.db = dbo;
        return self.db;
      })
      .catch(function(error) {
        console.log('db: error connecting to the database: ', error);
        throw(error);
      });
  }

  get() {
    return this.db;
  }

  close() {
    let self = this;

    if (!self.db) return Promise.resolve();

    return self.db.close()
      .then(function() {
        self.db = null;
      })
      .catch(function(error) {
        console.log('db: error closing the database: ', error);
        throw(error);
      });
  }
}

export { Db as default };
