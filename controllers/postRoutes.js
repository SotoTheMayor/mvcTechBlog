const router = require('express').Router();
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
            res.render('post', {
                post: {
                    title: post.title,
                    post: post.post,
                    postername: post.user.username,
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
            res.render('post', {
                loggedIn: req.session.loggedIn,
            });
    }
});

// const urlParams = new URLSearchParams(window.location.search);
router.post('/:id', async (req, res) => {
    console.log('+++++++++++++++++++++++' + req.path.toLocaleLowerCase() + '+++++++++++++++++++++++')
    const loggedUser = await User.findOne({
        where: { id: req.session.user_id },
        attributes: { exclude: ['password']}
    });
    // const activePost = await Post.findOne({
    //     where: { id: req.params.id },
    // });
    // const activePost = await Post.findByPk(req.params.id);
    // const post = activePost.get({ plain:true });
    // const post = activePost.map((post) =>
    // post.get({ plain:true })
    // );
    // console.log('+++++++++++++' + a + '++++++++++++++')
    try {
        const commentDB = await Comment.create({
            comment: req.body.comment,
            user_id: loggedUser.id,
            post_id: activePost,
        });
        req.session.save(() => {
            // req.session.loggedIn = true;
            res.status(200).json(commentDB);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

module.exports = router;
