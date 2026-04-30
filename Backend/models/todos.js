const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.SEQ_CONNECTION, {
  dialect: 'postgres',
  dialectModule: require('pg'),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
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
    defaultValue: 'Medium',
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'Personal',
  },
  checked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Todo;