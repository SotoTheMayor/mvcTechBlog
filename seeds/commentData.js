const Comment = require('../models/post');

const commentData = [
    {
        comment: 'this is a test comment 1, post 1',
        user_id: 1,
        post_id: 1,    },
    {
        post: 'this is a test comment 2, post 2',
        user_id: 2,
        post_id: 2,    },
    {
        post: 'this is a test comment 3, post 2',
        user_id: 3,
        post_id: 2,    },
    {
        post: 'this is a test comment 4, post 4',
        user_id: 1,
        post_id: 4,    },
    {
        post: 'this is a test comment 5, post 5',
        user_id: 3,
        post_id: 5,    },
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;