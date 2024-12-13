const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');  // Import the swagger definition
const axios = require('axios');  // Axios for making requests to the API

const app = express();

// Use the port from the environment, or fallback to 5000 for local development
const port = process.env.PORT || 5000;

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Example API route
app.get('/api/coins', async (req, res) => {
  try {
    // Use Axios to fetch data from another API (e.g., CoinGecko or any other public API)
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching coins data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
