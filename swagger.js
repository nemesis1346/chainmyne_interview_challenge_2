const swaggerJSDoc = require('swagger-jsdoc');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'My API',
    version: '1.0.0',
    description: 'API documentation for my Node.js app',
  },
  servers: [
    {
      url: 'http://localhost:5000',
    },
  ],
};

// Options for Swagger JSDoc
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Point to where your API routes are
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
