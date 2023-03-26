const router = require('express').Router();
const apiRoutes = require('./api');
const loginRoutes = require('./loginRoutes');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const postRoutes = require('./postRoutes');

router.use('/', loginRoutes);
router.use('/api', apiRoutes);
router.use('/home', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/post', postRoutes);

module.exports = router;