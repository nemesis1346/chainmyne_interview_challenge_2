/**
 * @swagger
 * /api/coins:
 *   get:
 *     summary: Get list of coins
 *     description: Fetches coin market data from CoinGecko by symbol string array.
 *     parameters:
 *       - in: query
 *         name: symbols
 *         schema:
 *           type: string
 *         description: Comma-separated list of symbols to filter by (e.g., "btc,eth").
 *         required: false
 *     responses:
 *       200:
 *         description: A list of coins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   symbol:
 *                     type: string
 *                   name:
 *                     type: string
 *                   current_price:
 *                     type: number
 *                   market_cap:
 *                     type: number
 *       404:
 *         description: No matching coins found
 *       500:
 *         description: Internal server error
 */
