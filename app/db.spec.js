'use strict';

import { expect } from 'chai';
import Db from './db';
import dotenv from 'dotenv';
import path from 'path';

let env_file = path.join(__dirname, "../project.env");
dotenv.config({ path: env_file });

describe('module db', function() {

  const db = new Db();

  it('connects to the database', function() {
    return db.connect()
      .then(function(dbo) {
        return expect(dbo).to.not.be.null;
      });
  });

  it('provides the database connection', function() {
    return db.connect()
      .then(function(dbo) {
        return expect(db.get()).to.deep.equal(dbo);
      });
  });

  it('closes the database connection', function() {
    return db.connect()
      .then(function() {
        return db.close()
          .then(function() {
            return expect(db.get()).to.be.null;
          });
      });
  });

  afterEach(function() {
    return db.close();
  });

});
