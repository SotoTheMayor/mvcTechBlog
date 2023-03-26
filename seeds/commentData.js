const Comment = require('../models/comment');

const commentData = [
    {
        comment: 'this is a test comment 1, post 1, user Dave',
        user_id: 3,
        post_id: 1,    },
    {
        comment: 'this is a test comment 2, post 2, user DougFunny',
        user_id: 1,
        post_id: 2,    },
    {
        comment: 'this is a test comment 3, post 2, user Jason',
        user_id: 4,
        post_id: 2,    },
    {
        comment: 'this is a test comment 4, post 4, user DougFunny',
        user_id: 1,
        post_id: 4,    },
    {
        comment: 'this is a test comment 5, post 5, user ofMiceandBiggerMice',
        user_id: 2,
        post_id: 5,    },
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;