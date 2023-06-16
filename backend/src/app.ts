// import { Request, Response } from 'express';

import { createServer } from './server';
import config from './config/config';

// loads the .env file into to manage the test and production environment

export const app = createServer();
const PORT = config.port;
const URL = config.url;
// Root URL
// app.get('/', (req: Request, res: Response) => {
//   console.log('someone accessed our root url!');
// res.json({
//   message: ' Welcome to CHEESECAKE Server\'s root URL!',
// });
// });

// start server
const server = app.listen(PORT, () => {
  console.log(`Starting Express Server at the URL: ${URL}:${PORT}`);
});

// For coverage, handle Ctrl+C gracefully
process.on('SIGINT', () => {
  server.close(() => console.log('Shutting down server gracefully.'));
});
