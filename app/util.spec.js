'use strict';

import { expect } from 'chai';
import util from './util';

describe('module util', function() {

  const anObject = { aBcdEf: 'xyz' };

  describe('hasCaseInsensitiveKey()', function() {
    it('matches a mixed-case key', function() {
      expect(util.hasCaseInsensitiveKey(anObject, 'AbCDeF')).to.be.true;
    });

    it('returns false if key is not found', function() {
      expect(util.hasCaseInsensitiveKey(anObject, 'WroNg')).to.be.false;
    });
  });

  describe('readCaseInsensitiveKey()', function() {
    it('returns value when the key is found', function() {
      expect(util.readCaseInsensitiveKey(anObject, 'AbCDeF')).to.equal('xyz');
    });

    it('returns undefined when the key is not found', function() {
      expect(util.readCaseInsensitiveKey(anObject, 'WroNg')).to.be.undefined;
    });
  });

});
