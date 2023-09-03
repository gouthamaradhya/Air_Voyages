// register.mjs - User registration module with MySQL database operations
import mysql from 'mysql2';

const dbConnection = mysql.createConnection({
  host: '127.0.0.1', // Change this to your MySQL server host
  user: 'root', // Change this to your MySQL username
  password: 'Aradhya@24365', // Change this to your MySQL password
  database: 'loginDetails',
});

// Connect to the MySQL database
dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Function to register a user
export const registerUser = async (username, password) => {
  try {
    // Check if the username already exists in the "users" table
    const query = 'SELECT * FROM users WHERE username = ?';
    const rows = await queryDatabase(query, [username]);

    if (rows.length > 0) {
      return { error: 'Username already exists' };
    }

    // If the username is unique, insert the user into the "users" table
    const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
    await queryDatabase(insertQuery, [username, password]);

    return { username, registrationStatus: 'success' };
  } catch (error) {
    throw error;
  } finally {
    // Close the database connection
    dbConnection.end();
  }
};

// Helper function to run SQL queries
function queryDatabase(query, values) {
  return new Promise((resolve, reject) => {
    dbConnection.query(query, values, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
