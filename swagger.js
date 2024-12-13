const swaggerJSDoc = require('swagger-jsdoc');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ChainMyne Challenge 2',
    version: '1.0.0',
    description: 'API documentation for my Node.js app',
  }
};

// Options for Swagger JSDoc
const options = {
  swaggerDefinition,
  apis: ['./swagger_routes/*.js'], // Point to where your API routes are
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
