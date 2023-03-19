const router = require('express').Router();
const User = require('../models/user')

router.get('/', async (req, res) => {
    res.render('login', {
        loggedIn: req.session.loggedIn,
    });
})

router.get('/login', async (req, res) => {
    res.render('login', {
        loggedIn: req.session.loggedIn,
    });
})

module.exports = router;
