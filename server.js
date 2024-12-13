const express = require('express');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');
const swaggerSpec = require('./swagger');  // Import the swagger definition
const axios = require('axios');  // Axios for making requests to the API
const Coin = require('./models/Coin'); // The model for the coin data

const app = express();

// Use the port from the environment, or fallback to 5000 for local development
const port = process.env.PORT || 5000;

// MongoDB connection string (replace with your actual connection string)
const mongoURI = 'mongodb://localhost:27017/coins_db';  // Use MongoDB Atlas URL if using a remote DB

//TODO: precent symbol not existent
//TODO: connect to atlas

const fetchDataFromCoinGecko = async () => {
	try {
		const options = {
			method: 'GET',
			url: 'https://api.coingecko.com/api/v3/coins/list',
			headers: { 
				accept: 'application/json', 
				'x-cg-demo-api-key': 'CG-AJjQFzrZCQX2muGyMuh1ZjBf' 
			}
		};
		
		const coins_response = await axios.request(options);  // Await the axios request
		// console.log(coins_response.data);  // Log the data from the response
		
		// Store the coins data in MongoDB
		// Delete existing data to avoid duplicates
		await Coin.deleteMany({});
		
		// Save the new data to MongoDB
		await Coin.insertMany(coins_response.data.slice(0,5));
		
		console.log('Coin data saved to MongoDB.');
	} catch (error) {
		console.error('Error fetching or saving coin data:', error);
	}
};

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
app.listen(port, async () => {
	// Connect to MongoDB
	await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	console.log('MongoDB connected')
	
	await fetchDataFromCoinGecko()
	console.log(`Server running at http://localhost:${port}`);
});
