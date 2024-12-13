const swaggerJSDoc = require('swagger-jsdoc');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ChainMyne Challenge 2',
    version: '1.0.0',
    description: `For this challenge, I created a Node.js server that calls an Axios request to the CoinGecko API to fetch the information required.

    The server app is running at the following URL:
    https://coingecko-swagger-605be96ad247.herokuapp.com/api-docs/#/default/get_api_coins

    **Features:**
    - It runs with Swagger UI so anyone can interact with the API endpoint for the coins.
    - It runs in a Heroku app.
    - It uses MongoDB Atlas for storing the information and reading from it.
    - It uses MongoDB model for fetching the data of the coins, then makes specific market data requests by symbol string (e.g., ETH, BTC...).
    - It prevents uppercase entries for parameters.

    **Algorithm for fetching the required data:**
    1. Listen to the server.
    2. Connect to MongoDB Atlas cluster.
    3. Make a request through Swagger to the endpoint `/api/coins`.
    4. Fetch data from https://api.coingecko.com/api/v3/coins/list (an entire list of all coins).
    5. Prevent uppercase entries in the parameters.
    6. Read coin data from MongoDB Atlas.
    7. Based on the input parameters, filter the entire list of coins from MongoDB to access the symbol property.
    8. Make an Axios call to https://api.coingecko.com/api/v3/coins/markets with the processed coin IDs.
    9. Filter unnecessary attributes and present them to the user.`
  }
};

// Options for Swagger JSDoc
const options = {
  swaggerDefinition,
  apis: ['./swagger_routes/*.js'], // Point to where your API routes are
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
