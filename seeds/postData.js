const Post = require('../models/post');

const postData = [
    {
        title: 'Post 1 title',        
        post: 'what even is this?',
        timestamp: 'Posted on 1/10/2021 at 1:30',
        user_id: 1,    },
    {
        title: 'Post 2 title',
        post: 'do you even code bro?',
        timestamp: 'Posted on 2/10/2022 at 2:30',
        user_id: 2,    },
    {
        title: 'Post 3 title',
        post: 'I like computers.',
        timestamp: 'Posted on 3/10/2023 at 3:30',
        user_id: 3,    },
    {
        title: 'Post 4 title',
        post: 'wait... LOL... what???',
        timestamp: 'Posted on 4/10/2024 at 4:30',
        user_id: 1,    },
    {
        title: 'Post 5 title',
        post: 'and carrots',
        timestamp: 'Posted on 5/10/2025 at 5:30',
        user_id: 3,    },
    {
        title: 'Post 6 title',
        post: 'I created all of you and made you say these things',
        timestamp: 'Posted on 6/10/2026 at 6:30',
        user_id: 4,    },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;