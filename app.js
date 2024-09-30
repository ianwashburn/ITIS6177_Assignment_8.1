const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();


const swaggerOptions = require('./swagger.json');
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /example:
 *   get:
 *     summary: Get list of examples
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: List of examples retrieved successfully
 */
app.get('/example', (req, res) => {
    res.json({ message: 'List of examples retrieved successfully' });
  });


app.get('/users', (req, res) => {
  // Implementation to fetch users
  res.json([
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
  ]);
});



app.listen(3000, () => {
  console.log('Server listening on port 3000');
});