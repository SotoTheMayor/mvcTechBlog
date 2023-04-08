// route for /dashboard
const router = require('express').Router();
const getTime = require('../utils/time');
const { Post, User, Comment } = require('../models');

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
            res.render('dashboard', {
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
            res.render('dashboard', {
                loggedIn: req.session.loggedIn,
            });
    }
});

router.post('/', async (req, res) => {
    const loggedUser = await User.findOne({
        where: { id: req.session.user_id },
        attributes: { exclude: ['password']}
    });
    try {

        const postDB = await Post.create({
            title: req.body.title,
            post: req.body.post,
            timestamp: getTime,
            user_id: loggedUser.id
        });
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(postDB);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

module.exports = router;
