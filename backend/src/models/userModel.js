const db = require("../config/db");

// Get user by email
const getUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users2 WHERE email = ?", [
    email,
  ]);
  return rows.length ? rows[0] : null;
};

// Get user by ID
const getUserById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users2 WHERE id = ?", [id]);
  return rows.length ? rows[0] : null;
};

// Create new user
const createUser = async (userData) => {
  const {
    firstname,
    lastname,
    email,
    password,
    about,
    bigDream,
    inspiration,
    obstacles,
    fears,
    regrets,
  } = userData;

  const [result] = await db.query(
    "INSERT INTO users2 (firstname, lastname, email, password, about, bigDream, inspiration, obstacles, fears, regrets) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      firstname,
      lastname,
      email,
      password,
      about,
      bigDream,
      inspiration,
      obstacles,
      fears,
      regrets,
    ]
  );

  return result.insertId;
};

// Update user profile
const updateUser = async (id, userData) => {
  const {
    firstname,
    lastname,
    about,
    bigDream,
    inspiration,
    obstacles,
    fears,
    regrets,
  } = userData;

  const [result] = await db.query(
    "UPDATE users2 SET firstname = ?, lastname = ?, about = ?, bigDream = ?, inspiration = ?, obstacles = ?, fears = ?, regrets = ? WHERE id = ?",
    [
      firstname,
      lastname,
      about,
      bigDream,
      inspiration,
      obstacles,
      fears,
      regrets,
      id,
    ]
  );

  return result.affectedRows > 0;
};

// Change password
const updatePassword = async (id, hashedPassword) => {
  const [result] = await db.query(
    "UPDATE users2 SET password = ? WHERE id = ?",
    [hashedPassword, id]
  );

  return result.affectedRows > 0;
};

// Create users2 table if it doesn't exist
const createUsersTable = async () => {
  // Check if table exists first
  const [tables] = await db.query(
    "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users2'"
  );

  if (tables.length > 0) {
    console.log("Users table already exists");
    return;
  }
  const sql = `
        CREATE TABLE IF NOT EXISTS users2 (
            id INT PRIMARY KEY AUTO_INCREMENT,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            about TEXT,
            bigDream TEXT,
            inspiration TEXT,
            obstacles TEXT, 
            fears TEXT,
            regrets TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;

  try {
    await db.query(sql);
    console.log("Users table created successfully");
  } catch (error) {
    console.error("Error creating users table:", error);
    throw error;
  }
};

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  updateUser,
  updatePassword,
  createUsersTable,
};
