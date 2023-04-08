const router = require('express').Router();
const apiRoutes = require('./api');
const loginRoutes = require('./loginRoutes');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const postRoutes = require('./postRoutes');
const editRoutes = require('./editRoutes');

router.use('/login', loginRoutes);
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/post', postRoutes);
router.use('/post/edit', editRoutes);

module.exports = router;