const router = require('express').Router();

const dashboardRoutes = require('./api');
const vehcilesRoutes = require('./test-routes.js');

router.use('/', vehcilesRoutes);
router.use('/api', dashboardRoutes);

module.exports = router;
