module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      id: 1,
      firstName: 'Peter',
      lastName: 'Tyonum',
      email: 'withtvpeter@gmail.com',
      phone: '08137277480',
      password: '$2b$08$00Vf/KLyQZHlGePTLNVepOGacDzImfhFWpQhfAymWrP/VZ5upa1Ki',
      gender: 'male',
      dob: '2000-03-23',
      role: 'admin',
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Linen',
      email: 'john@gmail.com',
      phone: '08137277481',
      password: '$2b$08$00Vf/KLyQZHlGePTLNVepOGacDzImfhFWpQhfAymWrP/VZ5upa1Ki',
      gender: 'male',
      dob: '2000-03-23',
      role: 'staff',
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
