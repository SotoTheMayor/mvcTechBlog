const Post = require('../models/post');

const postData = [
    {
        title: 'Post 1 title',        
        post: 'what even is this?',
        user_id: 1,    },
    {
        title: 'Post 2 title',
        post: 'do you even code bro?',
        user_id: 2,    },
    {
        title: 'Post 3 title',
        post: 'I like computers.',
        user_id: 3,    },
    {
        title: 'Post 4 title',
        post: 'wait... LOL... what???',
        user_id: 1,    },
    {
        title: 'Post 5 title',
        post: 'and carrots',
        user_id: 3,    },
    {
        title: 'Post 6 title',
        post: 'I created all of you and made you say these things',
        user_id: 4,    },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;