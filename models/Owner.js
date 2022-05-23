// import npm packages
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

// create our Owner model
class Owner extends Model {
  // // set up method to run on instance data (per Owner) to check password
  // checkPassword(loginPw) {
  //   return bcrypt.compareSync(loginPw, this.password);
  // }
}

// define table columns and configuration
Owner.init(
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
      autoIncrement: true,
    },
    // Owner first name column defined here
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    // Owner last name column defined here
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    // email column defined here
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // there cannot be any duplicate email values in this table
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // password column defined here
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the password must be at least four characters long
        len: [4],
      },
    },
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newOwnerData) {
        newOwnerData.password = await bcrypt.hash(newOwnerData.password, 10);
        return newOwnerData;
      },
      // set up beforeUpdate lifecycle "hook" functionality
      async beforeUpdate(updatedOwnerData) {
        updatedOwnerData.password = await bcrypt.hash(updatedOwnerData.password, 10);
        return updatedOwnerData;
      },
    },
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
    modelName: "owner",
  }
);

module.exports = Owner;
