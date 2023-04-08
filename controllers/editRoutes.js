// route for /post/edit/:id
// allows for updating and deleting of posts, middleware 
// and html button removal prevents these features for anything not owned by logged user
const router = require('express').Router({ mergeParams:true });
const ownerTest = require('../utils/ownerTest');

const { Post, User, Comment } = require('../models');

//displays page only if logged user owns the post
router.get('/:id', ownerTest, async (req, res) => {
    if (req.session.loggedIn) {
        const loggedUser = await User.findOne({
            where: { id: req.session.user_id },
            attributes: { exclude: ['password']}
        })
        try {
            const postData = await Post.findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    },
                ],
            });
            const post = postData.get({ plain:true });
            const commentData = await Comment.findAll({
                where: { post_id: post.id },
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    },
                ],
            });
            const comments = commentData.map((comment) =>
            comment.get({ plain:true })
        );
            res.render('editPost', {
                post: {
                    title: post.title,
                    post: post.post,
                    postername: post.user.username,
                    timestamp: post.timestamp,
                    post_id: post.post_id,
                },
                comments,
                username: loggedUser.username,
                loggedIn: req.session.loggedIn,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    } else {
            res.render('editPost', {
                loggedIn: req.session.loggedIn,
            });
    }
});

// updates post based on textarea submission
router.put('/:id', async (req, res) => {
    try {
        Post.update({
            post: req.body.post
        },
        {
            where: { id: req.body.post_id},
        });
        res.status(200).json();
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
})

// deletes post
router.delete('/:id', async (req, res) => {
    try {
    Comment.destroy({
        where: { post_id: req.body.post_id}
    });
    Post.destroy({
        where: { id: req.body.post_id}
    });
    res.status(200).json();
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

module.exports = router;

