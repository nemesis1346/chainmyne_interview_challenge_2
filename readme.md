# ChainMyne Challenge 2

For this challenge I created a node js server that calls axios request to the CoinGecko APi to fetch the information required

The server app is running in the following url:

https://coingecko-swagger-605be96ad247.herokuapp.com/api-docs/#/default/get_api_coins

#### Features:

* it runs with swagger UI so anyone can interact with the api endpoint for the coins

* it runs in a heroku app. 

* it uses mongo db atlas for storing the information and reading from it

* it uses mongo db model for fetching the data of the coins, then to do specific market data requests by symbol string (eg. ETH, BTC...)

* it prevents lowercase capital case param entries.

### Algorithm for fetching the required data:

1. listen to the server
2. connect to mongo db atlas cluster
3. do a request through swagger to the endpoint /api/coins
4. fetch data from https://api.coingecko.com/api/v3/coins/list (an entire list of all coins)
5. prevent upper case entries
6. read coin data from mongo db atlas
7. based on the input params, filter out the entire list of coins from mongo db so we have access to the symbol property
8. do an axios callt o https://api.coingecko.com/api/v3/coins/markets with the processes coin IDs
9. filter unnecesary attributes and present to the user