'use strict';

import jwt from 'jsonwebtoken';
import User from '../user/user';
import util from '../util';

const _SECRET = 'secret';

function extractToken(request) {
  let authHeader = util.readCaseInsensitiveKey(request.headers, 'Authorization');

  if (!authHeader) throw new Error('missing Authorization header');
  if (!authHeader.match(/^Bearer /i)) throw new Error('bad Authorization format');

  return authHeader.slice(7);
}

function authenticateJWT(request) {
  try {
    let token = extractToken(request);
    request.token = jwt.verify(token, _SECRET);
  } catch(error) {
    throw(error);
  }
}

function register(credentials) {
  return new Promise(function(resolve, reject) {

    if (!credentials.username) reject('username cannot be empty');
    if (!credentials.password) reject('password missing');

    const user = new User();

    return user.findMany({ username: credentials.username })
      .then(function(users) {
        if (users.length > 0) {
          reject('duplicate user');
        } else {
          return user.createOne(credentials)
            .then(function() {
              resolve(jwt.sign(credentials, _SECRET ));
            });
        }
      });
  });
}

function verify(credentials) {

  return new Promise(function(resolve, reject) {

    if (!credentials.username) reject('username cannot be empty');
    if (!credentials.password) reject('password missing');

    const user = new User();

    return user.findMany({ username: credentials.username })
      .then(function(users) {
        if (users.length == 0) reject('username does not exist');

        if (users[0].password == credentials.password ) {
          resolve(jwt.sign(credentials, _SECRET ));
        } else {
          reject('user name or password is incorrect');
        }
      });
  });
}

module.exports = {
  authenticateJWT: authenticateJWT,
  register: register,
  verify: verify
};
