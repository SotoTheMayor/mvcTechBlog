const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
    if (req.session.loggedIn) {
        const loggedUser = await User.findOne({
            where: { id: req.session.user_id },
            attributes: { exclude: ['password']}
        })
        try {
            const userData = await Post.findAll({
                where: { user_id: loggedUser.id },
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    },
                ],
            });
            const posts = userData.map((post) =>
                post.get({ plain:true })
            );
            res.render('comment', {
                userData,
                posts,
                username: loggedUser.username,
                loggedIn: req.session.loggedIn,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    } else {
            res.render('comment', {
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

