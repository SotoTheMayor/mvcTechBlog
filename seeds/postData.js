const Post = require('../models/post');

const postData = [
    {
        username: 'DougFunny',
        post: 'what even is this?',
    },
    {
        username: 'ofMiceandBiggerMice',
        post: 'do you even code bro?',
    },
    {
        username: 'Dave',
        post: 'I like computers.',
    },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;