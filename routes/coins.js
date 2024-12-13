/**
 * @swagger
 * /api/coins:
 *   get:
 *     summary: Get list of coins
 *     description: Fetches coins from an external API and returns the data
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
 */
