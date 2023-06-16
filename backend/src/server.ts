import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import errorHandler from 'middleware-http-errors';
import morgan from 'morgan';
import cors from 'cors';
// routes
import invoiceRoutes from './routes/invoiceRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import companyRoutes from './routes/companyRoutes';
//Swagger
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './swaggerOptions';
// import xmlparser from 'express-xml-bodyparser';
import bodyParser from 'body-parser';
import path from 'path';

export function createServer() {
  const app = express();
  app.use(
    express.static('public', {
      setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
        }
      },
    })
  );

  const staticFolderPath = path.join(__dirname, 'static');

  // Serve static files from the 'static' folder
  app.use(express.static(staticFolderPath));

  app.get('/', function(req, res) {
    res.sendFile(path.join(staticFolderPath, 'index.html'));
  });

  app.use(bodyParser.text());
  app.use(express.json());
  app.use(express.text({ type: 'application/xml' }));

  // handles errors nicely
  app.use(errorHandler());

  // for logging errors
  app.use(morgan('dev'));

  app.use(cors());

  // swagger
  const spec = swaggerJSDoc(options);

  // routes
  app.use(invoiceRoutes);
  app.use(userRoutes);
  app.use(authRoutes);
  app.use(companyRoutes);
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(spec));

  return app;
}
