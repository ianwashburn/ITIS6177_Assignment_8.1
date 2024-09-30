const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Ian API',
      version: '1.0.0',
      description: 'Company Swagger',
    },
  },
  apis: ['./server.js'], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'sample',
	port: 3306,
	connectionLimit: 10
});

/**
 * @swagger
 * /agents:
 *   get:
 *     summary: Get all agent records
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   agent code:
 *                     type: string
 *                   agent name:
 *                     type: string
 *                   working area:
 *                     type: string
 *                   commission:
 *                     type: integer
 *                   phone num:
 *                     type: string
 *                   country:
 *                     type: string
 */
app.get('/agents', async (req, res) => {
  //connect to the DB
  pool.getConnection();
  //perform the requests (SQL)
  const agents = await pool.query('select * from agents');
  console.log("data", agents);
  //define the header
  res.setHeader('Content-Type', 'application/json');
  //API response
  res.json(agents);
})

/**
 * @swagger
 * /company:
 *   get:
 *     summary: Get all company records
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   company id:
 *                     type: string
 *                   company name:
 *                     type: string
 *                   company city:
 *                     type: string
 */
app.get('/company', async (req, res) => {
  try{
  //connect to the DB
  pool.getConnection();
  //perform the requests (SQL)
  const company = await pool.query('select * from company');
  //define the header
  res.setHeader('Content-Type', 'application/json');
  //API response
  res.json(company);
  } catch {
    console.log(err);
    res.status(500).json({ error: 'Failed to get data' });
  }
})

/**
 * @swagger
 * /customer:
 *   get:
 *     summary: Get all customer records
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   customer code:
 *                     type: string
 *                   customer name:
 *                     type: string
 *                   customer city:
 *                     type: string
 *                   working area:
 *                     type: string
 *                   customer country:
 *                     type: string
 *                   grade:
 *                     type: integer
 *                   opening amount:
 *                     type: integer
 *                   recieve amount:
 *                     type: integer
 *                   payment amount:
 *                     type: integer
 *                   outstanding amount:
 *                     type: integer
 *                   phone num:
 *                     type: string
 *                   agent code:
 *                     type: string
 *       400:
 *         description: Bad request
 */
app.get('/customer', async (req, res) => {
  try{
  //connect to the DB
  pool.getConnection();
  //perform the requests (SQL)
  const customer = await pool.query('select * from customer');
  //define the header
  res.setHeader('Content-Type', 'application/json');
  //API response
  res.json(customer);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to get data' });
  }
})

/**
 * @swagger
 * /customer:
 *   post:
 *     summary: Create a new customer record
 *     description: Create a new customer record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cust_code:
 *                 type: string
 *               cust_name:
 *                 type: string
 *               cust_city:
 *                 type: string
 *               working_area:
 *                 type: string
 *               cust_country:
 *                 type: string
 *               grade:
 *                 type: integer
 *               opening_amt:
 *                 type: integer
 *               recieve_amt:
 *                 type: integer
 *               payment_amt:
 *                 type: integer
 *               outstanding_amt:
 *                 type: integer
 *               phone_no:
 *                 type: string
 *               agent_code:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customer code:
 *                   type: string
 *                 customer name:
 *                   type: string
 *       400:
 *         description: Bad request
 */
app.post('/customer', async (req, res) => {
  try {
    await pool.getConnection();
    console.log("data", req.body);
    const { CUST_CODE, CUST_NAME, CUST_CITY, WORKING_AREA, CUST_COUNTRY, GRADE, OPENING_AMT, RECEIVE_AMT, PAYMENT_AMT, OUTSTANDING_AMT, PHONE_NO, AGENT_CODE } = req.body;
    const result = await pool.query('INSERT INTO customer (CUST_CODE, CUST_NAME, CUST_CITY, WORKING_AREA, CUST_COUNTRY, GRADE, OPENING_AMT, RECEIVE_AMT, PAYMENT_AMT, OUTSTANDING_AMT, PHONE_NO, AGENT_CODE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [CUST_CODE, CUST_NAME, CUST_CITY,
        WORKING_AREA, CUST_COUNTRY, GRADE, OPENING_AMT, RECEIVE_AMT, PAYMENT_AMT,
        OUTSTANDING_AMT, PHONE_NO, AGENT_CODE]);
    res.setHeader('Content-Type', 'application/json');
    res.json({ message: 'Data inserted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to insert data' });
  }
})

/**
 * @swagger
 * /customer/{CUST_CODE}:
 *  delete:
 *      summary: Delete customer record
 *      description: Delete customer record
 *      parameters:
 *        - in: path
 *          name: CUST_CODE
 *          schema:
 *              type: string
 *          required: true
 *          description: Customer code of customer record to delete
 *      responses:
 *          200:
 *              description: Customer record was deleted
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customer code:
 *                   type: string
 *                 customer name:
 *                   type: string
 */
app.delete('/customer/:CUST_CODE', async (req, res) => {
  try {
    await pool.getConnection();    
    const { CUST_CODE } = req.params;
    console.log(req.params.CUST_CODE);
    const customer = await pool.query('DELETE FROM customer where CUST_CODE = ?',  [CUST_CODE]);
    console.log(customer);
    res.status(200).json({message: 'Customer deleted successfully'});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to delete data' });
  }
})

/**
 * @swagger
 * /customer/{CUST_CODE}:
 *   put:
 *     summary: Update a customer by customer code
 *     tags:
 *       - Customer
 *     parameters:
 *       - in: path
 *         name: cust_code
 *         required: true
 *         description: customer code of the customer to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Customer to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              cust_name:
 *                type: string
 *              cust_city:
 *                type: string
 *              working_area:
 *                type: string
 *              cust_country:
 *                type: string
 *              grade:
 *                type: integer
 *              opening_amt:
 *                type: integer
 *              recieve_amt:
 *                type: integer
 *              payment_amt:
 *                type: integer
 *              outstanding_amt:
 *                type: integer
 *              phone_no:
 *                type: string
 *              agent_code:
 *                type: string
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer code:
 *                 type: string
 *               customer name:
 *                 type: string
 */
app.put('/customer/:CUST_CODE', async (req,res) => {
  try {
    await pool.getConnection();
    const { CUST_CODE } = req.params;
    const { CUST_NAME, CUST_CITY, WORKING_AREA, CUST_COUNTRY, GRADE, OPENING_AMT, RECEIVE_AMT, PAYMENT_AMT, OUTSTANDING_AMT, PHONE_NO, AGENT_CODE } = req.body;
    console.log(req.params.CUST_CODE);
    console.log("data", req.body);
    const customer = await pool.query('UPDATE customer SET CUST_NAME = ?, CUST_CITY = ?, WORKING_AREA = ?, CUST_COUNTRY = ?, GRADE = ?, OPENING_AMT = ?, RECEIVE_AMT = ?, PAYMENT_AMT = ?, OUTSTANDING_AMT = ?, PHONE_NO = ?, AGENT_CODE = ? where CUST_CODE = ?',  [CUST_NAME, CUST_CITY, WORKING_AREA, CUST_COUNTRY, GRADE, OPENING_AMT, RECEIVE_AMT, PAYMENT_AMT, OUTSTANDING_AMT, PHONE_NO, AGENT_CODE, CUST_CODE]);
    console.log(customer);
    res.setHeader('Content-Type', 'application/json');
    res.json({ message: 'Data updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to update data'});
  }
})

/**
 * @swagger
 * /customer/{CUST_CODE}:
 *   patch:
 *     summary: Update a customer name by customer code
 *     tags:
 *       - Customer
 *     parameters:
 *       - in: path
 *         name: cust_code
 *         required: true
 *         description: customer code of the customer name to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Customer name to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              cust_name:
 *                type: string
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */
app.patch('/customer/:CUST_CODE', async (req,res) => {
  try {
    await pool.getConnection();
    const { CUST_CODE } = req.params;
    const { CUST_NAME } = req.body;
    console.log(req.params.CUST_CODE);
    console.log("data", req.body);
    const customer = await pool.query('UPDATE customer SET CUST_NAME = ? where CUST_CODE = ?',  [CUST_NAME, CUST_CODE]);
    console.log(customer);
    res.setHeader('Content-Type', 'application/json');
    res.json({ message: 'Data updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to update data'});
  }
})

app.listen(port, () => {
	console.log('Example app listening at port http://localhost:${port}')
});