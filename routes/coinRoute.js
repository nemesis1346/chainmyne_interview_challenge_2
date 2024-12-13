const express = require('express');
const Coin = require('../models/Coin');
const fetchDataFromCoinGecko = require('../coinGecko');
const axios = require('axios');  // Axios for making requests to the API

const router = express.Router();

router.get('/api/coins', async (req, res) => {
    try {
		//fetch latest coin data info
		await fetchDataFromCoinGecko()
		
		// Extract the symbols parameter and split it into an array
		const symbolsParam = req.query.symbols; // E.g., 'btc,eth'
		const symbols = symbolsParam ? symbolsParam.split(',').map(symbol => symbol.toLowerCase()) : []; 
		console.log("Symbols to lower case: ", symbols)
		
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

module.exports = router;