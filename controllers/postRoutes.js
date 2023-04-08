// route for /post
const router = require('express').Router({ mergeParams:true });
const getTime = require('../utils/time')

const { Post, User, Comment } = require('../models');

// gets Post specific info based on query params
router.get('/:id', async (req, res) => {
// majority of page only renders if logged in
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
        //test to make edit button visible if logged user is post owner
        let postOwner
        if (loggedUser.id == postData.user_id) {
            postOwner = true;
        } else {
            postOwner = false;
        }
            res.render('post', {
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
                postOwner,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    } else {
// only post displayed with instructions to log in first if not loggedIn
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
        res.render('post', {
            post: {
                title: post.title,
                post: post.post,
                postername: post.user.username,
                timestamp: post.timestamp,
                post_id: post.post_id,
            },
            comments,
            loggedIn: req.session.loggedIn,
        });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

// add a comment to the current post identified in the query params
router.post('/:id', async (req, res) => {
    const loggedUser = await User.findOne({
        where: { id: req.session.user_id },
        attributes: { exclude: ['password']}
    });
        try {
        const commentDB = await Comment.create({
            comment: req.body.comment,
            timestamp: getTime,
            user_id: loggedUser.id,
            post_id: req.body.post_id,
        });
        req.session.save(() => {
            res.status(200).json(commentDB);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

module.exports = router;

