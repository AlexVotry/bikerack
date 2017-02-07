'use strict';

import Db from '../db';
import { expect } from 'chai';
import User from './user';

describe('User', function() {

  const db = new Db();
  let user;

  const userList = [
    { username: 'user0', password: 'asdf1234' },
    { username: 'user1', password: 'asdf1234' },
    { username: 'user2', password: 'asdf1234' }
  ];

  before(function() {
    return db.connect()
      .then(function() {
        user = new User();
        return user.collection.remove();
      });
  });

  beforeEach(function() {
    return user.createMany(userList);
  });

  it('knows the truth when it sees it', function() {
    expect(true).to.be.true;
  });

  afterEach(function() {
    return user.collection.remove();
  });

  after(function() {
    return db.close();
  });
});
