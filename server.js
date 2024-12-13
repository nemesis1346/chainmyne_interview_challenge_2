const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');  // Import the swagger definition
const connectDB = require('./db');
const coinsRouter = require('./routes/coinRoute'); 
require('dotenv').config();
const app = express();

// Use the port from the environment, or fallback to 5000 for local development
const port = process.env.PORT || 5000;

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Example API route
app.use(coinsRouter);

// Start the server
app.listen(port, async () => {
	// Connect to MongoDB
	connectDB()
	
	console.log(`Server running at http://localhost:${port}`);
});
