//GET all Owners

const router = require(".");

router.get('/', async (req, res) => {
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

router.delete('/owner/:id', withAuth, async (req, res) => {
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
        res.render('owner', {owner, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//GET all vehilces

router.get('/', async (req, res) => {
    try {
        const dbVehicleData = await Vehicle.findAll();
        
        const vehicle = dbVehicleData.get({ plain: true });

        res.render('vehicle', { vehicle, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/logins', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('logins');
});

module.exports = router; 