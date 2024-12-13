const axios = require('axios');
require('dotenv').config();
const Coin = require('./models/Coin'); // The model for the coin data

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

module.exports = fetchDataFromCoinGecko;
