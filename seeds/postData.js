const Post = require('../models/post');

const postData = [
    {
        post: 'what even is this?',
        user_id: 1,    },
    {
        post: 'do you even code bro?',
        user_id: 2,    },
    {
        post: 'I like computers.',
        user_id: 3,    },
    {
        post: 'wait... LOL... what???',
        user_id: 1,    },
    {
        post: 'and carrots',
        user_id: 3,    },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;