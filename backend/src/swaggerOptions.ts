import path from 'path';
let swaggerUrl: string;

if (process.env.NODE_ENV === 'production') {
  console.log('Running db in production mode');
  swaggerUrl =
    'http://e-invoice-storage-api-dev.ap-southeast-2.elasticbeanstalk.com/';
} else {
  console.log('Running db in test mode');
  swaggerUrl = 'http://127.0.0.1:3200/';
}

export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tasks API',
      version: '2.0.0',
      description: 'A simple Express Invoice storage API',
    },
    servers: [
      {
        url: `${swaggerUrl}`,
      },
    ],
  },
  apis: [path.join(__dirname, 'swaggerOptions.js')],
};

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          pattern: '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
 *          description: User's account email
 *        password:
 *          type: string
 *          minLength: 6
 *          description: An encrypted password used for logging in
 *        id:
 *          type: string
 *          description: An auto-generated ID of the user
 *        name:
 *          type: string
 *          description: The user's name
 *        companyKey:
 *          type: string
 *          description: The user's company name
 *      required: [email, password, name]
 *      example:
 *        email: z0000000@ad.unsw.edu.au
 *        password: password123
 *        name: John Smith
 *        companyKey: UNSW
 *        id: abc123def456
 *    Invoice:
 *      type: object
 *
 *
 */
/**
 * @swagger
 * /auth/registerCompany:
 *   post:
 *     summary: Register a new company
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                companyEmail:
 *                  type: string
 *                  pattern: '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
 *                  description: The email of the company's account
 *                companyName:
 *                  type: string
 *                  description: The name of the company
 *                numEmployees:
 *                  type: integer
 *                  description: The number of employees in the company
 *                ABN:
 *                  type: integer
 *                  description: The ABN of the company
 *           example:
 *             companyName: "Acme Inc."
 *             companyEmail: "admin@acme.com"
 *             numEmployees: 50
 *             ABN: 12345678901
 *     responses:
 *       '200':
 *         description: Company registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 companyKey:
 *                   type: string
 *                   description: The unique key generated for the registered company
 *             example:
 *               companyKey: "abc123"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Email is invalid.
 *       '409':
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Company is already registered
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: An error occurred while processing the request.
 */
/**
 * @swagger
 * /auth/registerUser:
 *   post:
 *     summary: Add a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *            email: z0000000@ad.unsw.edu.au
 *            password: password123
 *            name: John Smith
 *            companyKey: K123456789
 *         application/xml:
 *           schema:
 *             type: string
 *     responses:
 *       '200':
 *         description: The user was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: An authentication token for the registered user
 *                 userId:
 *                   type: string
 *                   description: The ID of the registered user
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Email is invalid.
 *       '409':
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Email is already registered
 *       '404':
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Company key does not exist
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 pattern: '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
 *                 description: User's account email
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: An encrypted password used for logging in
 *           example:
 *             email: john.doe@example.com
 *             password: password123
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication.
 *                 userId:
 *                   type: string
 *                   description: User ID of the logged in user.
 *       '400':
 *         description: Invalid email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Email is invalid.
 *       '401':
 *         description: User with this email does not exist or password is incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: User with this email does not exist or password is incorrect.
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: An error occurred while processing the request.
 */
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Authentication]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           description: JWT token for authentication.
 *     responses:
 *       '200':
 *         description: Successful logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {"message": "User logged out successfully"}
 *       '401':
 *         description: Unauthorized - the provided token was invalid or expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Invalid token
 *       '403':
 *        description: Forbidden - the provided token was not for a user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message.
 *                  example: User already logged out
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: An error occurred while processing the request.
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     XmlModel:
 *       type: object
 *       properties:
 *         invoice:
 *           type: object
 *           properties:
 *             customer:
 *               type: string
 *             total:
 *               type: string
 *       example:
 *         invoice:
 *           customer: John Smith
 *           total: 50.00
 *
 */
/**
 * @swagger
 * /invoice/store:
 *   post:
 *     summary: Store an invoice
 *     tags: [Invoices]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: An authorization token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         text/plain:
 *           schema:
 *             type: string
 *           example: |
 *            <?xml version="1.0" encoding="UTF-8"?>
 *            <Invoice>
 *            <Customer>John Smith</Customer>
 *            <Total>50.00</Total>
 *            </Invoice>
 *     responses:
 *       '200':
 *         description: Successful storage
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 invoiceId:
 *                   type: string
 *                   description: An ID that corresponds to the invoice stored
 *       '400':
 *         description: Bad request - must be 2.1 UBL invoice format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Bad request, invalid input
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Unauthorized, invalid token
 *       '500':
 *         description: Unsuccessful storage, database full or connection error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Unsuccessful storage, database full or connection error
 */

/**
 * @swagger
 * /invoice/store/v2:
 *   post:
 *     summary: Store an invoice
 *     description: version 2 invoice storage now uses a different validation api, supports different input formats and records extra fields inside the datbase for improving the query performance
 *     tags: [Invoices]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: An authorization token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/xml:
 *           schema:
 *             type: object
 *             properties:
 *               Invoice:
 *                 type: object
 *                 properties:
 *                   Customer:
 *                     type: string
 *                   Total:
 *                     type: number
 *           example: |
 *             <?xml version="1.0" encoding="UTF-8"?>
 *             <Invoice>
 *               <Customer>John Smith</Customer>
 *             </Invoice>
 *     responses:
 *       '200':
 *         description: Successful storage
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 invoiceId:
 *                   type: string
 *                   description: An ID that corresponds to the invoice stored
 *       '400':
 *         description: Bad request - must be 2.1 UBL invoice format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Bad request, invalid input
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Unauthorized, invalid token
 *       '500':
 *         description: Unsuccessful storage, database full or connection error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Unsuccessful storage, database full or connection error
 *
 */

/**
 * @swagger
 * /invoice/upload:
 *   post:
 *     summary: Upload an invoice
 *     tags: [Invoices]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: An authorization token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               invoiceFile:
 *                 type: string
 *                 format: binary
 *                 description: The invoice file to be uploaded (XML or JSON format)
 *           encoding:
 *             invoiceFile:
 *               contentType: 'application/xml, application/json'
 *     responses:
 *       '200':
 *         description: Successful upload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 invoiceId:
 *                   type: string
 *                   description: An ID that corresponds to the uploaded invoice
 *       '400':
 *         description: Bad request - invalid input or unsupported file format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Bad request, invalid input or unsupported file format
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Unauthorized, invalid token
 *       '500':
 *         description: Unsuccessful upload, server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Unsuccessful upload, server error
 */

/**
 * @swagger
 * /invoice/show/{invoiceId}:
 *   get:
 *     summary: Get details of an invoice in XML format
 *     tags: [Invoices]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: An authorization token
 *         schema:
 *           type: string
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         description: The ID of the invoice to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The invoice details in XML format
 *         content:
 *          application/xml:
 *            schema:
 *              type: string
 *              format: xml
 *              example: |
 *                <?xml version="1.0" encoding="UTF-8"?>
 *                <Invoice>
 *                <Customer>John Smith</Customer>
 *                <Total>50.00</Total>
 *                </Invoice>
 *       '403':
 *         description: Forbidden error, user cannot view this invoice
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       '401':
 *         description: Unauthorized, invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       '500':
 *         description: Unsuccessful storage, database full or connection error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */

/**
 * @swagger
 * /invoice/show/v2/{invoiceId}:
 *   get:
 *     summary: Get details of an invoice and the XML text
 *     description: Version 2 now also returns addtional information that maybe useful to users instead of just a raw xml body.
 *     tags: [Invoices]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: An authorization token
 *         schema:
 *           type: string
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         description: The ID of the invoice to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The invoice details in XML format
 *         content:
 *          application/xml:
 *            schema:
 *              type: string
 *              format: xml
 *              example: |
 *                <?xml version="1.0" encoding="UTF-8"?>
 *                <Invoice>
 *                <Customer>John Smith</Customer>
 *                <Total>50.00</Total>
 *                </Invoice>
 *       '403':
 *         description: Forbidden error, user cannot view this invoice
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       '401':
 *         description: Unauthorized, invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       '500':
 *         description: Unsuccessful storage, database full or connection error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */

/**
 * @swagger
 * /invoice/showRange:
 *   get:
 *     summary: Get details of a range of invoices in XML format
 *     tags: [Invoices]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: An authorization token
 *         schema:
 *           type: string
 *       - in: query
 *         name: quantity
 *         description: The number of invoices to retrieve
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *       - in: query
 *         name: filter
 *         required: false
 *         description: The field to sort by. Default is most recently stored
 *         schema:
 *           type: string
 *           enum: [amount, duedate, company]
 *     responses:
 *       200:
 *         description: The invoice details
 *         content:
 *           application/xml:
 *             schema:
 *               type: object
 *               properties:
 *                 invoices:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The XML of the invoices
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
 *       '500':
 *         description: Unsuccessful storage, database full or connection error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */

/**
 * @swagger
 * /invoice/showRange/v2:
 *   get:
 *     summary: gets details of a range of invoices
 *     description: Version two now supports entering an offset to skip a number of invoices, This is used for pagination.
 *     tags: [Invoices]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: An authorization token
 *         schema:
 *           type: string
 *       - in: query
 *         name: quantity
 *         description: The number of invoices to retrieve, leave blank = all
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *       - in: query
 *         name: offset
 *         required: false
 *         description: The number of invoices to skip before retrieving the range
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *       - in: query
 *         name: filter
 *         required: false
 *         description: The field to sort by. Default is most recently stored
 *         schema:
 *           type: string
 *           enum: [amount, duedate, company]
 *     responses:
 *       200:
 *         description: The invoice details
 *         content:
 *           application/xml:
 *             schema:
 *               type: object
 *               properties:
 *                 invoices:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The XML of the invoices
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
 *       '500':
 *         description: Unsuccessful storage, database full or connection error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */

/**
 * @swagger
 * /invoice/modify/{invoiceId}:
 *   put:
 *     summary: Modify an existing invoice
 *     tags:
 *       - Invoices
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Authentication token
 *         schema:
 *           type: string
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         description: The ID of the invoice to modify
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         text/plain:
 *           schema:
 *             type: string
 *           example: |
 *            <?xml version="1.0" encoding="UTF-8"?>
 *            <Invoice>
 *            <Customer>John Smith</Customer>
 *            <Total>50.00</Total>
 *            </Invoice>
 *     responses:
 *       200:
 *         description: The invoice was successfully modified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invoice modified successfully
 *                   # Example message: 'Invoice 0001 modified successfully'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid XML data
 *                   # Example message: 'The XML data provided is not valid'
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
 *                   # Example message: 'Invalid or missing authentication token'
 *       403:
 *         description: User cannot modify this invoice
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User cannot modify this invoice
 *                   # Example message: 'You are not authorized to modify this invoice'
 *       404:
 *         description: The invoice with the specified ID was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invoice not found
 *                   # Example message: 'Invoice 0001 not found'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                   # Example message: 'An unexpected error occurred'
 */
/**
 * @swagger
 * /invoice/delete:
 *   delete:
 *     summary: Delete an invoice
 *     tags: [Invoices]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Authentication token
 *         schema:
 *           type: string
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         description: The ID of the invoice to delete
 *         schema:
 *           type: string
 *           example: '0001'
 *     responses:
 *       200:
 *         description: The invoice was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invoice deleted successfully
 *                   # Example message: 'Invoice 0001 deleted successfully'
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
 *                   # Example message: 'Invalid or missing authentication token'
 *       403:
 *         description: User cannot delete this invoice
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User cannot delete this invoice
 *                   # Example message: 'You are not authorized to delete this invoice'
 *       404:
 *         description: The invoice with the specified ID was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invoice not found
 *                   # Example message: 'Invoice 0001 not found'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                   # Example message: 'An unexpected error occurred'
 */
/**
 * @swagger
 * /invoice/encrypt:
 *   post:
 *     summary: Encrypt an invoice's XML content and return the encrypted XML as a string
 *     tags: [Invoices]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: An authorization token
 *         schema:
 *           type: string
 *       - in: query
 *         name: secretKey
 *         required: true
 *         description: The secret key to be used for encryption
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/xml:
 *           schema:
 *             type: string
 *             format: xml
 *             example: |
 *               <?xml version="1.0" encoding="UTF-8"?>
 *               <Invoice>
 *               <Customer>John Smith</Customer>
 *               <Total>50.00</Total>
 *               </Invoice>
 *     responses:
 *       200:
 *         description: The encrypted invoice XML as a string
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "SomeSecretKey"
 *       400:
 *         description: Encryption failed due to invalid input or an incorrect secret key
 */
/**
 * @swagger
 * /invoice/decrypt:
 *   get:
 *     summary: Decrypt an invoice and return the details in XML format
 *     tags: [Invoices]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: An authorization token
 *         schema:
 *           type: string
 *       - in: query
 *         name: invoiceId
 *         required: true
 *         description: The ID of the invoice to decrypt and retrieve
 *         schema:
 *           type: string
 *       - in: query
 *         name: secretKey
 *         required: true
 *         description: The secret key to use for decryption
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The decrypted invoice details in XML format
 *         content:
 *          application/xml:
 *            schema:
 *              type: string
 *              format: xml
 *              example: |
 *                <?xml version="1.0" encoding="UTF-8"?>
 *                <Invoice>
 *                <Customer>John Smith</Customer>
 *                <Total>50.00</Total>
 *                </Invoice>
 *       400:
 *         description: Decryption failed due to an incorrect key or invalid input
 */
