'use strict';

import Bike from './bike';
import Db from '../db';
import { expect } from 'chai';
import fixtures from '../fixtures';

describe('Bike', function() {

  const db = new Db();
  let bike;

  const bikeList = fixtures.bikeList;
  const user = fixtures.userList[2];
  let userBikes = [];

  before(function() {
    bikeList.forEach(function(bicycle) {
      if (bicycle.userId === user.userId) {
        userBikes.push(bicycle);
      }
    });

    return db.connect()
      .then(function() {
        bike = new Bike(user.userId);
        return bike.collection.remove();
      });
  });

  beforeEach(function() {
    return bike.createMany(bikeList);
  });

  it('knows the truth when it sees it', function() {
    expect(true).to.be.true;
  });

  it('gets the bikes owned by the user', function() {
    return bike.all()
      .then(function(bikes) {
        expect(bikes.length).to.be.equal(userBikes.length);
      });
  });

  it('finds a specific bike', function() {
    return bike.findOne({ name: userBikes[1].name })
      .then(function(bikes) {
        expect(bikes.model).to.equal(userBikes[1].model);
      });
  });

  afterEach(function() {
    return bike.collection.remove();
  });

  after(function() {
    return db.close();
  });
});
