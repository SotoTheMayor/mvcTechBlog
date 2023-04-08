// base route for '/'
const router = require('express').Router();
const { Post, User } = require('../models');

//displays page with button and screen text adjustments based on loggedIn status
router.get('/', async (req, res) => {
//if loggedIn
    if (req.session.loggedIn) {
    const loggedUser = await User.findOne({
        where: { id: req.session.user_id },
        attributes: { exclude: ['password']}
    })
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const posts = postData.map((post) =>
            post.get({ plain:true })
        );
        res.render('home', {
            posts,
            username: loggedUser.username,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
} else {
//if not loggedIn
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const posts = postData.map((post) =>
            post.get({ plain:true })
        );
        res.render('home', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    } 
}
});


module.exports = router;