'use strict';

import app from '../app';
import Db from '../db';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import request from 'supertest-as-promised';
import User from '../user/user';

const _SECRET = 'secret';

describe('user.route', function() {

  const db = new Db();
  let user;

  before(function() {
    return db.connect()
      .then(function() {
        user = new User();
        return user.collection.remove();
      });
  });

  // xit('knows the truth when it sees it', function() {
  //   expect(true).to.be.true;
  // });

  afterEach(function() {
    return user.collection.remove();
  });

  after(function() {
    return db.close();
  });
});
