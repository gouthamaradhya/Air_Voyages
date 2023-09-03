// server.mjs
import express from 'express';
import { findCheapestFlight } from './dijkstra.mjs';

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public', { extensions: ['mjs'] }));

// Define a route to handle requests for the HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
