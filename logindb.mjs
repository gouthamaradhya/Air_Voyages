import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: '127.0.0.1', // Change this to your MySQL server host
  user: 'root',      // Change this to your MySQL username
  password: 'Aradhya@24365', // Change this to your MySQL password
  database: 'loginDetails', // Change this to your MySQL database name
};

// Function to check login credentials
export async function checkLoginCredentials(username, password) {
    try {
      // Establish a new database connection for each login attempt
      const connection = await mysql.createConnection(dbConfig);
  
      // Query the database to find a user with the provided username and password
      const [rows] = await connection.query(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username.toLowerCase(), password] // Convert username to lowercase for case-insensitive comparison
      );
  
      console.log('Received Email:', username);
      console.log('Received Password:', password);
      console.log('Fetched Data:', rows[0]);
  
      if (rows.length === 1) {
        // Credentials are correct
        console.log('Login Successful for Username:', username);
        return true;
      }
  
      // Credentials are incorrect
      console.log('Login Failed. No matching user found.');
      return false;
    } catch (error) {
      console.error('Error checking login credentials:', error);
      throw error;
    }
  }
  
  
  
  
  
  
