/**
 * ==========================================================
 * TaskNova - Database Setup & Seed Script
 * ==========================================================
 *
 * This script will:
 * 1. Create PostgreSQL database if it does not exist
 * 2. Connect to database
 * 3. Create / update tables
 * 4. Seed demo user
 * 5. Seed sample tasks
 *
 * Run Command:
 * npm run db:setup
 *
 * Make sure .env contains:
 * SEQ_CONNECTION=postgres://username:password@localhost:5432/tasknova
 * ==========================================================
 */

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

/**
 * ==========================================================
 * Parse PostgreSQL connection string
 * Example:
 * postgres://postgres:1234@localhost:5432/tasknova
 * ==========================================================
 */
function parseConnectionString(connectionString) {
  const url = new URL(connectionString);

  return {
    host: url.hostname,
    port: url.port || 5432,
    username: url.username,
    password: url.password,
    database: url.pathname.slice(1),
  };
}

/**
 * ==========================================================
 * Create database if not exists
 * Connects first to default "postgres" database
 * ==========================================================
 */
async function createDatabaseIfNotExists() {
  const config = parseConnectionString(process.env.SEQ_CONNECTION);

  const adminSequelize = new Sequelize({
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: 'postgres',
    dialect: 'postgres',
    dialectModule: require('pg'),
    logging: false,
  });

  try {
    await adminSequelize.authenticate();

    const [results] = await adminSequelize.query(
      `SELECT 1 FROM pg_database WHERE datname='${config.database}'`
    );

    if (results.length === 0) {
      console.log(`📦 Creating database "${config.database}"...`);
      await adminSequelize.query(`CREATE DATABASE "${config.database}"`);
      console.log('✅ Database created successfully!\n');
    } else {
      console.log(`ℹ️ Database "${config.database}" already exists.\n`);
    }

  } finally {
    await adminSequelize.close();
  }
}

/**
 * ==========================================================
 * Global variables
 * ==========================================================
 */
let sequelize;
let User;
let Todo;

/**
 * ==========================================================
 * Define Sequelize Models
 * ==========================================================
 */
function defineModels() {

  /**
   * User Table
   */
  User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  /**
   * Todo Table
   */
  Todo = sequelize.define('todo', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
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
      defaultValue: false,
    },
  });

  /**
   * Relationships
   */
  User.hasMany(Todo, { foreignKey: 'user_id' });
  Todo.belongsTo(User, { foreignKey: 'user_id' });
}

/**
 * ==========================================================
 * Hash Password
 * ==========================================================
 */
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

/**
 * ==========================================================
 * Seed Users
 * ==========================================================
 */
const seedUsers = [
  {
    username: 'demo',
    password: 'demo123',
  },
];

/**
 * ==========================================================
 * Seed Sample Tasks
 * ==========================================================
 */
const seedTodos = [
  {
    text: 'Welcome to TaskNova',
    time: '30-04-2026',
    priority: 'High',
    category: 'Work',
    checked: false,
  },
  {
    text: 'Create your first task',
    time: '01-05-2026',
    priority: 'Medium',
    category: 'Personal',
    checked: false,
  },
];

/**
 * ==========================================================
 * Main Setup Function
 * ==========================================================
 */
async function setupDatabase() {
  try {

    console.log('🔌 Checking database...');
    await createDatabaseIfNotExists();

    /**
     * Connect to target DB
     */
    sequelize = new Sequelize(process.env.SEQ_CONNECTION, {
      dialect: 'postgres',
      dialectModule: require('pg'),
      logging: false,
    });

    /**
     * Load models
     */
    defineModels();

    /**
     * Test connection
     */
    console.log('🔌 Connecting...');
    await sequelize.authenticate();
    console.log('✅ Connected successfully!\n');

    /**
     * Sync tables
     */
    console.log('📦 Syncing tables...');
    await sequelize.sync({ alter: true });
    console.log('✅ Tables synced successfully!\n');

    /**
     * Check existing users
     */
    const count = await User.count();

    if (count === 0) {

      console.log('🌱 Seeding demo data...');

      for (const item of seedUsers) {

        const user = await User.create({
          username: item.username,
          password: await hashPassword(item.password),
        });

        for (const todo of seedTodos) {
          await Todo.create({
            ...todo,
            user_id: user.id,
          });
        }
      }

      console.log('✅ Demo data inserted successfully!\n');

    } else {
      console.log(`ℹ️ ${count} user(s) already exist. Seed skipped.\n`);
    }

    /**
     * Display login credentials
     */
    console.log('══════════════════════════════════════');
    console.log('🔑 DEMO LOGIN');
    console.log('══════════════════════════════════════');
    console.log('Username: demo');
    console.log('Password: demo123');
    console.log('══════════════════════════════════════\n');

    /**
     * Show tables
     */
    const tables = await sequelize.getQueryInterface().showAllTables();

    console.log('📊 Tables:');
    tables.forEach(table => console.log(`- ${table}`));

    console.log('\n🎉 TaskNova setup complete!');

  } catch (err) {

    console.log('\n❌ Error:', err.message);

    if (err.message.includes('ECONNREFUSED')) {
      console.log('💡 PostgreSQL server is not running.');
    }

  } finally {

    if (sequelize) {
      await sequelize.close();
      console.log('\n🔌 Database connection closed.');
    }

  }
}

/**
 * ==========================================================
 * Run Script
 * ==========================================================
 */
setupDatabase();