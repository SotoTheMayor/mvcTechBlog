const Comment = require('../models/comment');

const commentData = [
    {
        comment: 'this is a test comment 1, post 1, user Dave',
        timestamp: 'Posted on 1/11/2021 at 1:30',
        user_id: 3,
        post_id: 1,    },
    {
        comment: 'this is a test comment 2, post 2, user DougFunny',
        timestamp: 'Posted on 2/12/2022 at 2:30',
        user_id: 1,
        post_id: 2,    },
    {
        comment: 'this is a test comment 3, post 2, user Jason',
        timestamp: 'Posted on 3/13/2023 at 3:30',
        user_id: 4,
        post_id: 2,    },
    {
        comment: 'this is a test comment 4, post 4, user DougFunny',
        timestamp: 'Posted on 4/14/2020 at 4:30',
        user_id: 1,
        post_id: 4,    },
    {
        comment: 'this is a test comment 5, post 5, user ofMiceandBiggerMice',
        timestamp: 'Posted on 5/15/2020 at 5:30',
        user_id: 2,
        post_id: 5,    },
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;