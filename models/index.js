// import models
const Owner = require('./Owner');
const Vehicle = require('./Vehicle');

// create model associations
// Owners can have many Vehicles
Owner.hasMany(Vehicle, {
  foreignKey: 'owner_id'
});

// An Owner has vehicles associated to them
Vehicle.belongsTo(Owner, {
  foreignKey: 'owner_id'
});

module.exports = { Owner}