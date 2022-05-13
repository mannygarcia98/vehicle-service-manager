const router = require('express').Router();

const dashboardRoutes = require('./dashboard');
const apiRoutes = require('./api');
const testRoutes = require('./test-routes');

router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/', testRoutes)

module.exports = router;
