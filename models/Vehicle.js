// import npm packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create the Vehicle model
class Vehicle extends Model {}

// define table columns and configuration
Vehicle.init(
  {
    // id column defined here
    id: {
      // use the special Sequelize DataTypes object, provide what type of data it is
      type: DataTypes.INTEGER,
      // this is the equivlent of SQL's `NOT NULL` option
      allowNull: false,
      // instruct that this is the Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true
    },
    // Vehicle make column defined here
    make: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    // Vehicle model column defined here
    model: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    // Vehicle year column defined here
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isDecimal: true,
        max: 4
      }
    },
    // Vehicle license plate number column defined here
    license_number: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'owner',
        key: 'id'
      }
    },
  },
  {
    // TABLE CONFIGURATION OPTIONS GO HERE
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'vehicle'
  }
);

module.exports = Vehicle;