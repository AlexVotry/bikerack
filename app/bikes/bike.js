'use strict';

import Model from '../model';
import { ObjectID as ObjectId } from 'mongodb';

class Bike extends Model {
  constructor(userId) {
    super('bikes');
    this.userId = userId;
  }

  all() {
    return this.findMany({ userId: this.userId });
  }

  findOne(queryObject) {
    queryObject.userId = this.userId;

    return super.findOne(queryObject);
  }

  drop(queryObject) {
    queryObject.userId = this.userId;

    if (Object.keys(queryObject).indexOf('_id') > -1) {
      queryObject['_id'] = ObjectId(queryObject['_id']);
    }

    return super.drop(queryObject);
  }

  update(queryObject) {
    let filterObject;

    queryObject.userId = this.userId;

    if (Object.keys(queryObject).indexOf('_id') > -1) {
      filterObject = { '_id': ObjectId(queryObject['_id']) };
      queryObject['_id'] = ObjectId(queryObject['_id']);
    }

    return super.update(filterObject, queryObject);
  }
}

export { Bike as default };
