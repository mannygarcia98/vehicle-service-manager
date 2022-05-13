const router = require('express').Router();

const dashboardRoutes = require('./dashboard');
const vehcilesRoutes = require('./vehicles-routes');

router.use('/', vehcilesRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
