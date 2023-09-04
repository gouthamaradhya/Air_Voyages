import mysql from 'mysql2';
import { PriorityQueue } from 'datastructures-js';

// Create a MySQL database connection
const dbConnection = mysql.createConnection({
  host: '127.0.0.1', // Change this to your MySQL server host
  user: 'root', 
  port:'3306',// Change this to your MySQL username
  password: 'Aradhya@24365', // Change this to your MySQL password
  database: 'flight_reservation_system',
});

// Connect to the database
dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Function to retrieve flight data
async function getFlightData() {
  const query = 'SELECT * FROM flights';

  try {
    const [results] = await dbConnection.promise().query(query);
    const flights = results.map((row) => ({
      flight_id: row.flight_id,
      flight_name: row.flight_name,
      source: row.source,
      destination: row.destination,
      fare: row.fare,
    }));
    return flights;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw error;
  }
}

// Dijkstra's algorithm to find the cheapest flight
export async function findCheapestFlight(source, destination) {
  try {
    const flightData = await getFlightData();

    const graph = {};

    // Build the graph from the flight data
    flightData.forEach((flight) => {
      if (!graph[flight.source]) {
        graph[flight.source] = [];
      }
      graph[flight.source].push({ node: flight.destination, cost: flight.fare });

      // Add flights from Dubai as well
      if (!graph[flight.destination]) {
        graph[flight.destination] = [];
      }
    });

    const priorityQueue = new PriorityQueue((a, b) => a.cost - b.cost); // Compare function for PriorityQueue
    const distances = {};
    const path = {};

    // Initialize distances and priority queue
    for (const city in graph) {
      if (city === source) {
        distances[city] = 0;
        priorityQueue.enqueue({ node: city, cost: 0 });
      } else {
        distances[city] = Infinity;
        priorityQueue.enqueue({ node: city, cost: Infinity });
      }
      path[city] = null;
    }

    while (!priorityQueue.isEmpty()) {
      const { node: currentCity, cost: currentCost } = priorityQueue.dequeue();

      if (currentCity === destination) {
        // We found the cheapest route to the destination
        const cheapestRoute = [];
        let current = destination;
        while (current !== null) {
          cheapestRoute.unshift(current);
          current = path[current];
        }
        return {
          route: cheapestRoute,
          cost: distances[destination],
        };
      }

      if (currentCost <= distances[currentCity]) {
        graph[currentCity].forEach((neighbor) => {
          const candidateDistance = currentCost + neighbor.cost;
          if (candidateDistance < distances[neighbor.node]) {
            distances[neighbor.node] = candidateDistance;
            path[neighbor.node] = currentCity;
            priorityQueue.enqueue({ node: neighbor.node, cost: candidateDistance });
          }
        });
      }
    }

    // No route found
    return null;
  } catch (error) {
    console.error('Error in findCheapestFlight:', error);
    return null;
  }
}


