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
                where: { user_id: req.session.user_id },
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


module.exports = router;
