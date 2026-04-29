// models/user.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.SEQ_CONNECTION, {
  dialectModule: require('pg')
});
const Todo = sequelize.define('todo', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priority: {
  type: DataTypes.STRING,
  defaultValue: 'Medium'
},

category: {
  type: DataTypes.STRING,
  defaultValue: 'Personal'
},
  checked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
});

module.exports = Todo;
