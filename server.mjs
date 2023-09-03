// server.mjs - Combined server with user registration and flight search
import express from 'express';
import mysql from 'mysql2';
import { findCheapestFlight } from './dijkstra.mjs';
import { registerUser } from './register.mjs';
import { checkLoginCredentials } from './logindb.mjs';

const app = express();
const port = 3000;
app.use(express.json()); // For parsing JSON requests
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded requests


const dbConnection = mysql.createConnection({
  host: '127.0.0.1', // Change this to your MySQL server host
  user: 'root', // Change this to your MySQL username
  password: 'Aradhya@24365', // Change this to your MySQL password
  database: 'loginDetails',
});

// server.mjs
// server.mjs


// Connect to the MySQL database
dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});
app.use(express.static('public', { extensions: ['html', 'mjs'] }));
app.use(express.json());

// Serve the HTML page for user registration
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  try {
    res.sendFile(__dirname + '/public/login.html');
  } catch (error) {
    console.error('Error serving login.html:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/register.html');
});

// API endpoint for finding the cheapest flight
app.get('/api/findCheapestFlight', async (req, res) => {
  const { source, destination } = req.query;
  try {
    const cheapestFlight = await findCheapestFlight(source, destination);
    res.json(cheapestFlight);
  } catch (error) {
    console.error('Error in findCheapestFlight:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint for user registration
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const registrationResult = await registerUser(username, password);

    if (registrationResult.error) {
      res.status(400).json({ error: registrationResult.error });
    } else {
      res.json(registrationResult);
    }
  } catch (error) {
    console.error('Error in user registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
