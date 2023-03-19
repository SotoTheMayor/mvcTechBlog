const router = require('express').Router();
const apiRoutes = require('./api')
const loginRoutes = require('./loginRoutes')
const homeRoutes = require('./homeRoutes')

router.use('/', loginRoutes);
router.use('/api', apiRoutes);
router.use('/home', homeRoutes);

module.exports = router;