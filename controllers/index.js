const router = require('express').Router();

<<<<<<< HEAD
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/', dashboardRoutes);
router.use('/api', apiRoutes);
=======
const dashboardRoutes = require('./dashboard');
const apiRoutes = require('./api');
const testRoutes = require('./test-routes');

router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/', testRoutes)
>>>>>>> main

module.exports = router;