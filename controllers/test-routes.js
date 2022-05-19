const router = require('express').Router();
const { Owner, Vehicle } = require('../models');

const withAuth = require('../utils/auth');

//GET all Owners
router.get('/owners', async (req, res) => {
    try {
        const dbOwnerdata = await Owner.findAll({
            include: [
                {
                    model: Vehicle,
                    attributes: ['year', 'make', 'model', 'license_plate'],
                },
            ],
        });

        const owners = dbOwnerData.map((owner) => 
        owner.get({ plain: true })
        );

        res.render('dashboard', {
            owners,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//DELETE one owner

router.delete('/owner/:id', async (req, res) => {
    try {
        const dbOwnerData = await Owner.findByPk(req.params.id, {
            include: [
                {
                    model: Vehicle,
                    attributes: [
                    'year',
                    'make',
                    'model',
                    'license_plate',
                    ],
                },
            ],
        });

        const owner = dbOwnerData.delete({ plain: true });
        res.render('dashboard', {owner, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//GET all vehilces

router.get('/vehicles', async (req, res) => {
    try {
        const dbVehicleData = await Vehicle.findAll();
        
        const vehicle = dbVehicleData.get({ plain: true });

        res.render('dashboard', { vehicle, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router; 
