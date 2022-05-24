const router = require("express").Router();
const { Owner, Vehicle } = require("../models");
const { ensureAuthenticated } = require("../config/auth");

// /dashboard/owners
router.get("/owners", (req, res) => {
  Owner.findAll({
    // attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

// GET one owner

router.get("/owner/:id", ensureAuthenticated, async (req, res) => {
  try {
    const dbOwnerData = await Owner.findByPk(req.params.id, {
      include: [
        {
          model: Vehicle,
          attributes: ["year", "make", "model", "license_plate", "owner_id"],
        },
      ],
    });

    const owner = dbOwnerData.get({ plain: true });

    res.json(dbOwnerData);

    res.render("dashboard", { owner, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//PUT one owner

router.put("/owner/:id", async (req, res) => {
  try {
    const dbOwnerData = await Owner.findByPk(req.params.id, {
      include: [
        {
          model: Vehicle,
          attributes: ["year", "make", "model", "license_plate", "owner_id"],
        },
      ],
    });

    const owner = dbOwnerData.put({ plain: true });
    res.render("dashboard", { owner, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one vehicle
router.get("/vehicle/:id", ensureAuthenticated, async (req, res) => {
  try {
    const dbVehicleData = await Vehicle.findByPk(req.params.id);

    const vehicle = dbVehicleData.get({ plain: true });

    res.json(dbVehicleData);
    console.log(dbVehicleData);

    res.render("dashboard", { vehicle, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE a Vehicle
router.post("/vehicle", (req, res) => {
  Vehicle.create({
    year: req.body.year,
    make: req.body.make,
    model: req.body.model,
    license_plate: req.body.license_plate,
    owner_id: req.body.owner_id,
  })
    .then((dbVehicleData) => res.json(dbVehicleData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE a vehicle
router.put("/vehicle/:id", (req, res) => {
  Vehicle.update(
    {
      year: req.body.year,
      make: req.body.make,
      model: req.body.model,
      license_plate: req.body.license_plate,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbVehicleData) => {
      if (!dbVehicleData) {
        res.status(404).json({ message: "No vehicle found with this id" });
        return;
      }
      res.json(dbVehicleData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE a Vehicle
router.delete("/vehicle/:id", (req, res) => {
  Vehicle.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbVehicleData) => {
      if (!dbVehicleData) {
        res.status(404).json({ message: "No vehicle found with this id" });
        return;
      }
      res.json(dbVehicleData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/", ensureAuthenticated, (req, res) => {
  Owner.findOne({
    where: {
      email: req.user.email,
    },
    attributes: ["id", "first_name", "last_name", "email"],
    include: [
      {
        model: Vehicle,
        attributes: ["id", "year", "make", "model", "license_plate", "owner_id"],
      },
    ],
  }).then((dbOwnerData) => {
    res.render("dashboard", dbOwnerData.get({ plain: true }));
  });
});

router.get("/", ensureAuthenticated, (req, res) => {
  Owner.findOne({
    where: {
      email: req.user.email,
    },
    attributes: ["id", "first_name", "last_name", "email"],
    include: [
      {
        model: Vehicle,
        attributes: ["id", "year", "make", "model", "license_plate", "owner_id"],
      },
    ],
  }).then((dbOwnerData) => {
    res.render("dashboard", dbOwnerData.get({ plain: true }));
  });
});

module.exports = router;
