//middleware to prevent editing of posts not owned by manually entering URL
const { Post } = require('../models');

const ownerTest = async (req, res, next) => {
    const post_id = req.params.id;
    const postData = await Post.findByPk(post_id);
    const post = postData.get({ plain:true });
    if (post.user_id === req.session.user_id) {
        next()
    } else {
        res.redirect(`/post/${post.id}`)
    }
}

module.exports = ownerTest;