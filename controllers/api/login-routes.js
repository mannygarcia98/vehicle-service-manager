const router = require('express').Router();
const { Owner } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const dbOwnerData = await Owner.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbOwnerData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logins', async (req, res) => {
    try {
        const dbOwnerData = await Owner.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!dbOwnerData) {
            res.status(400).json({message: 'Incorrect email or password. Please try again.'});
            return;
        }

        const validPassword = await dbOwnerData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again.'});
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json({ owner: dbOwnerData, message:'You are logged in!'});
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        res.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;