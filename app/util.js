'use strict';

function hasCaseInsensitiveKey(object, name) {
  for (var key in object) {
    if (key.toLowerCase() === name.toLowerCase()) return true;
  }
  return false;
}

function readCaseInsensitiveKey(object, name) {
  for (var key in object) {
    if (key.toLowerCase() === name.toLowerCase()) return object[key];
  }
}

module.exports = {
  hasCaseInsensitiveKey: hasCaseInsensitiveKey,
  readCaseInsensitiveKey: readCaseInsensitiveKey
};
