const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const chalk = require('chalk');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan-body');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const winston = require('winston');
const xss = require('xss-clean');


// HTTPS options for secure connection
// const httpsOptions = {
//   key: fs.readFileSync('path/to/key.pem'),
//   cert: fs.readFileSync('path/to/cert.pem')
// };

// Basic security enhancements with Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      upgradeInsecureRequests: [],
    }
  }
}));

// CORS setup
app.use(cors({
  origin: 'https://yourdomain.com' // Adjust the origin according to your needs
}));



// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Compression middleware
app.use(compression());

// JSON and URL-encoded parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan for HTTP request logging
morgan(app);


// Apply xss-clean middleware
app.use(xss());


// Setup your routes here

const userRouter = require('../Routes/user.Routes')



app.use('/api', userRouter);


// 404 Not Found Middleware
app.use((req, res) => {
  res.status(404).send({
    status: 404,
    title: 'Route Not Found!'
  });
});

// Improved error handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  res.status(statusCode).send({
    status: statusCode,
    title: error.publicMessage || 'Internal Server Error',
    detail: process.env.NODE_ENV === 'development' ? error.message : undefined,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
});

// Logging setup with Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// HTTPS server setup
console.log(chalk.blue.bold(`---------- NODE ENVIRONNEMENT: ------- ${process.env.NODE_ENV} -------`))
// https.createServer(app).listen(process.env.PORT, () => {
//   console.log(chalk.green.italic(`API server running on port ${process.env.PORT} over HTTPS`));
// });
app.listen(process.env.PORT,(req, res) => {
    console.log(chalk.green.italic(`------------  API server running on port ${process.env.PORT} -----------`))
})

module.exports = app;
