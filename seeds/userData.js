const User = require('../models/user');

const userData = [
    {
        username: 'DougFunny',
        email: 'df@email.com',
        password: 'aaaaaa',
    },
    {
        username: 'ofMiceandBiggerMice',
        email: 'mice@email.com',
        password: 'aaaaaa',
    },
    {
        username: 'Dave',
        email: 'dave@email.com',
        password: 'aaaaaa',
    },
    {
        username: 'Jason',
        email: 'j@j.com',
        password: 'password',
    },
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;