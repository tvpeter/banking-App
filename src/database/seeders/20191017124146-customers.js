module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Customers', [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      phone: '09089839232',
      gender: 'male',
      dob: '1999-09-7',
    },
    {
      id: 2,
      firstName: 'James',
      lastName: 'Allen',
      email: 'james@gmail.com',
      phone: '08032439485',
      gender: 'male',
      dob: '2000-09-27',
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Customers', null, {}),
};
