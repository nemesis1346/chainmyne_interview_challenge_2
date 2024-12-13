const express = require('express');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');
const swaggerSpec = require('./swagger');  // Import the swagger definition
const axios = require('axios');  // Axios for making requests to the API
const Coin = require('./models/Coin'); // The model for the coin data
require('dotenv').config();
const app = express();

// Use the port from the environment, or fallback to 5000 for local development
const port = process.env.PORT || 5000;

// MongoDB connection string (replace with your actual connection string)
// const mongoURI = 'mongodb://localhost:27017/coins_db';  // for use locally DB
const mongoURI = "mongodb+srv://marcomaigua1346:"+process.env.MONGO_DB_ATLAS+"@cluster0.a99up.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tls=true";

const fetchDataFromCoinGecko = async () => {
	try {
		const options = {
			method: 'GET',
			url: 'https://api.coingecko.com/api/v3/coins/list',
			headers: { 
				accept: 'application/json', 
				'x-cg-demo-api-key': process.env.COIN_GECKO_API_KEY
			}
		};
		
		const coins_response = await axios.request(options);  // Await the axios request
		// console.log(coins_response.data);  // Log the data from the response
		
		//validating the existence of all the fields before saving
		const validCoins = coins_response.data.filter(coin => 
			coin.id && coin.symbol && coin.name
		);
		
		// Store the coins data in MongoDB
		// Delete existing data to avoid duplicates
		await Coin.deleteMany({});
		
		// Save the new data to MongoDB
		await Coin.insertMany(validCoins);
		
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
		
		// Extract the symbols parameter and split it into an array
		const symbolsParam = req.query.symbols; // E.g., 'btc,eth'
		const symbols = symbolsParam ? symbolsParam.split(',') : []; 

		console.log('symbols param: '+symbols)
		
		// get all the coin data from mongodb
		const coins = await Coin.find(); 
		// console.log('Coins from mongodb: '+coins)
		
		if (symbols.length === 0) {
			// Return all coins if no symbols are provided
			return res.status(400).json({ message: 'No params provided' });
		}
		
		// Filter coins data using the symbols parameter
		const filteredCoinsParam = coins.filter(coin => symbols.includes(coin.symbol));
		console.log('filteredCoinsParam: ', filteredCoinsParam)
		
		if (filteredCoinsParam.length === 0) {
			return res.status(404).json({ message: 'No matching coins found for the provided symbols' });
		}

		let ids_param = filteredCoinsParam.map(coin_param => coin_param.id).join(',');

		console.log('ids param: ',ids_param)
		
		// Use axios to fetch data from coingecko
		const options = {
			method: 'GET',
			url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&ids='+ids_param,
			headers: {accept: 'application/json', 'x-cg-demo-api-key': process.env.COIN_GECKO_API_KEY}
		};
		response = await axios.request(options);
		
		const filteredResponse = response.data.map(coin => ({
			id: coin.id,
			symbol: coin.symbol,
			name: coin.name,
			current_price: coin.current_price, 
			price_change_24h: coin.price_change_24h,     
		}));

		res.json(filteredResponse);
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
