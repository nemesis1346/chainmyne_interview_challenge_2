const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');  // Import the swagger definition
const axios = require('axios');  // Axios for making requests to the API

const app = express();
const port = 5000;

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Example API route
app.get('/api/coins', async (req, res) => {
  try {
    // API key should be stored in an environment variable (process.env)
    const options = {
      method: 'GET',
      url: 'https://api.coingecko.com/api/v3/coins/markets',
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
      },
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-AJjQFzrZCQX2muGyMuh1ZjBf' // Use the API key from environment variables
      },
    };

    // Make the request to the CoinGecko API
    const response = await axios.request(options);

    // Return the data from CoinGecko API to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching coins data:', error);
    res.status(500).json({ message: 'Error fetching coins data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
