/**
 * ==========================================================
 * TaskNova - Database Setup & Seed Script (PRODUCTION READY)
 * ==========================================================
 *
 * Works for:
 * ✅ Local PostgreSQL
 * ✅ Cloud PostgreSQL (SSL required)
 *
 * Run:
 * npm run db:setup
 *
 * Make sure:
 * SEQ_CONNECTION=postgresql://username:password@host:5432/dbname
 * ==========================================================
 */

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

/**
 * ==========================================================
 * Parse PostgreSQL connection string
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
 * Create database if not exists (LOCAL ONLY)
 * ⚠️ Skipped automatically for cloud DBs
 * ==========================================================
 */
async function createDatabaseIfNotExists() {
  const connectionString = process.env.SEQ_CONNECTION;

  // Skip for cloud DB (they don’t allow CREATE DATABASE)
  if (
    connectionString.includes('render.com') ||
    connectionString.includes('supabase.co') ||
    connectionString.includes('neon.tech') ||
    connectionString.includes('railway.app')
  ) {
    console.log('☁️ Cloud DB detected → Skipping DB creation\n');
    return;
  }

  const config = parseConnectionString(connectionString);

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
 * Define Models
 * ==========================================================
 */
function defineModels() {
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
 * Seed Data
 * ==========================================================
 */
const seedUsers = [
  { username: 'demo', password: 'demo123' },
];

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
     * ✅ MAIN FIX: SSL ENABLED HERE
     */
    sequelize = new Sequelize(process.env.SEQ_CONNECTION, {
      dialect: 'postgres',
      dialectModule: require('pg'),
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    });

    defineModels();

    console.log('🔌 Connecting...');
    await sequelize.authenticate();
    console.log('✅ Connected successfully!\n');

    console.log('📦 Syncing tables...');
    await sequelize.sync({ alter: true });
    console.log('✅ Tables synced successfully!\n');

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

    console.log('══════════════════════════════════════');
    console.log('🔑 DEMO LOGIN');
    console.log('Username: demo');
    console.log('Password: demo123');
    console.log('══════════════════════════════════════\n');

    console.log('🎉 TaskNova setup complete!');
  } catch (err) {
    console.error('\n❌ Error:', err.message);
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