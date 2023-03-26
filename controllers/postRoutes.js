const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// router.get('/', async (req, res) => {
//     const loggedUser = await User.findOne({
//         where: { id: req.session.user_id },
//         attributes: { exclude: ['password']}
//     })
//     res.render('post', {
//         username: loggedUser.username,
//         loggedIn: req.session.loggedIn,
//     })
// })

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
            res.render('post', {
                // userData,
                post: {
                    title: post.title,
                    post: post.post,
                    postername: post.user.username,
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
            res.render('post', {
                loggedIn: req.session.loggedIn,
            });
    }
});

router.post('/', async (req, res) => {
    const loggedUser = await User.findOne({
        where: { id: req.session.user_id },
        attributes: { exclude: ['password']}
    });
    const postId = await Comment.findOne({
        where: { id: req.session.post_id },
    });
    try {
        const commentDB = await Comment.create({
            comment: req.body.comment,
            user_id: loggedUser.id,
            post_id: postId.id,
        });
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(commentDB);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

module.exports = router;

