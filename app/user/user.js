'use strict';

import Model from '../model';

class User extends Model {
  constructor() {
    super('users');
  }
}

export { User as default };
