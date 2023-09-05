document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search1');
  const sourceInput = document.getElementById('source');
  const destinationInput = document.getElementById('destination');
  const flightDetailsContainer = document.getElementById('flightDetails');

  searchButton.addEventListener('click', async () => {
    event.preventDefault(); 
    const sourceCity = sourceInput.value;
    const destinationCity = destinationInput.value;

    try {
      // Make a fetch request to the server endpoint
      const response = await fetch(`/api/findCheapestFlight?source=${sourceCity}&destination=${destinationCity}`);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const cheapestFlight = await response.json();

      if (cheapestFlight) {
        // Display the flight information
        const cheapestRoute = cheapestFlight.route.join(' -> ');
        const totalCost = cheapestFlight.cost;
        flightDetailsContainer.innerHTML = `
          <h2>The Most Affordable Flight:</h2>
          <p>${cheapestRoute}</p>
          <h2>Total Cost:</h2>
          <p>Rs. ${totalCost}</p>
        `;
      } else {
        flightDetailsContainer.innerHTML = '<p>No route found.</p>';
      }
    } catch (error) {
      console.error('Error fetching or displaying cheapest flight:', error);
      // Display an error message on the page
      flightDetailsContainer.innerHTML = '<p>An error occurred. Please try again.</p>';
    }
  });
});
