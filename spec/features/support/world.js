var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

function World() {
  chai.use(chaiAsPromised);
  this.expect = chai.expect;
}

module.exports = function() {
  this.World = World;
};

