'use strict';

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('AccountTypes', [{
    id: 1,
    name: 'Savings'
  }, {
    id: 2,
    name: 'Current'
  }]),
  down: queryInterface => queryInterface.bulkDelete('AccountTypes', null, {})
};