const router = require('express').Router();
//const { route } = require('../api');
const { Owner, Vehicle } = require('../models');

// const withAuth = require('../utils/auth');

// GET all Owners for dashboard
/*router.get('/', async (req, res) => {
    try {
        const dbOwnerdata = await Owner.findAll({
            include: [
                {
                    model: Vehicle,
                    attributes: ['make', 'model', 'license#'],
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
});*/

// GET one owner

router.get('/owner/:id', async (req, res) => {
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
                    'owner_id'
                    ],
                },
            ],
        });

        const owner = dbOwnerData.get({ plain: true });
        res.render('owner', {owner, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//PUT one owner

router.put('/owner/:id', async (req, res) => {
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
                    'owner_id'
                    ],
                },
            ],
        });

        const owner = dbOwnerData.put({ plain: true });
        res.render('owner', {owner, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET one vehicle
router.get('/vehicle/:id', async (req, res) => {
    try {
        const dbVehicleData = await Vehicle.findByPk(req.params.id);
        
        const vehicle = dbVehicleData.get({ plain: true });

        res.render('vehicle', { vehicle, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// CREATE a Vehicle
router.post('/vehicle', (req, res) => {
    Vehicle.create({
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        license_plate: req.body.license_plate,
        owner_id: req.body.owner_id
    })
    .then(dbVehicleData => res.json(dbVehicleData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// UPDATE a vehicle
router.put('/vehicle/:id', (req, res) => {
    Vehicle.update(
    {
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        license_plate: req.body.license_plate
    },
    {
    where: {
        id: req.params.id
    }
    }
)
    .then(dbVehicleData => {
    if (!dbVehicleData) {
        res.status(404).json({ message: 'No vehicle found with this id' });
        return;
    }
    res.json(dbVehicleData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE a Vehicle
router.delete('/vehicle/:id', (req, res) => {
    Vehicle.destroy({
        where: {
        id: req.params.id
        }
    })
    .then(dbVehicleData => {
    if (!dbVehicleData) {
        res.status(404).json({ message: 'No vehicle found with this id' });
        return;
    }
        res.json(dbVehicleData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/logins', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('logins');
});

module.exports = router;