const router = require('express').Router({ mergeParams:true });
const getTime = require('../utils/time')

const { Post, User, Comment } = require('../models');

router.get('/:id', async (req, res) => {
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

router.post('/:id', async (req, res) => {
    const loggedUser = await User.findOne({
        where: { id: req.session.user_id },
        attributes: { exclude: ['password']}
    });
        try {
        console.log('+++++++++++++++++++++++' + req.body.post_id + '+++++++++++++++++++++++')
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

router.delete('/:id', async (req, res) => {
    console.log('+++++++++++++++++++++++' + req.body.post_id + '+++++++++++++++++++++++')

    try {
    Post.destroy({
        where: { id: req.body.post_id}
    });
    res.status(200).json();
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

router.delete('/comment/:id', async (req, res) => {
    try {
    Comment.destroy({
        where: { comment_id: req.params.id}
    })
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

module.exports = router;

