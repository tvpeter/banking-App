module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Branches', [
    {
      id: 1,
      name: 'First Bank, Allen Junction',
      location: 'Ikeja Lagos',
      email: 'info@fbn.com',
      address: '78 John Kings Street, Allen Avenue',
    },
    {
      id: 2,
      name: 'First Bank, Palmgrove',
      location: 'Palmgrove Lagos',
      email: 'contact@fbn.com',
      address: '78 John Kings Street, Allen Avenue',
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Branches', null, {}),
};
