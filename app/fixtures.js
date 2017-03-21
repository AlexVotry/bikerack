'use strict';

const userList = [
  { userId: 'id0', username: 'user0', password: 'asdf1234' },
  { userId: 'id1', username: 'user1', password: 'asdf1234' },
  { userId: 'id2', username: 'user2', password: 'asdf1234' }
];

const bikeList = [
  { userId: 'id0', name: 'Townie', model: 'Schwinn', year: 1985, color: 'blue', parts: [{ chain: 'greasy' }, { brakes: 'old' }] },
  { userId: 'id1', name: 'Track', model: 'Tiemeyer', year: 2010, color: 'black', parts: [{ chain: 'used' }, { brakes: 'DP' }] },
  { userId: 'id1', name: 'Mounty', model: 'Raleigh', year: 2003, color: 'green', parts: [{ chain: 'DA' }, { brakes: 'disc' }] },
  { userId: 'id2', name: 'Goldie', model: 'Specialized', year: 2013, color: 'gold', parts: [{ chain: 'DA' }, { brakes: 'SRAM' }] },
  { userId: 'id2', name: 'Townie', model: 'Felt', year: 2015, color: 'gold', parts: [{ chain: 'SRAM10' }, { brakes: 'TRP' }] },
  { userId: 'id2', name: 'Crossie', model: 'Raleigh', year: 2012, color: 'gold', parts: [{ chain: 'DA' }, { brakes: 'disc' }] }
];

const bike =
  { userId: 'id2', name: 'bike4', model: 'Raleigh', year: 2000, color: 'silver', parts: [{ chain: 'DA' }, { brakes: 'SRAM' }] };

module.exports = {
  bikeList: bikeList,
  userList: userList,
  bike: bike
};
