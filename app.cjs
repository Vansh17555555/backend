const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const passportsetup=require('./passport-setup')
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const stateroutes = require('./Routes/stateroutes.cjs');
const userroutes=require('./Routes/userroutes.cjs')
const materialroutes=require('./Routes/metalroutes.cjs');
const app = express();
app.use(session({
  secret: process.env.SESSION_SECRET, // Use the secret key from your environment variable
  resave: false,
  saveUninitialized: true,
}));

const passport=require('passport')
//const session = require('express-session');
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.session());
const oauthroutes=require('./Routes/oauthroutes.cjs')
// Define a rate limiter with a maximum of 100 requests per hour
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
  max: 100, // Max requests per window
  message: 'Too many requests from this IP, please try again in an hour.',
});

// Apply the rate limiter to the '/ewaste' route
app.use('/ewaste', limiter);

// Enable CORS with specific options
const corsOptions = {
  origin: '*', // Replace with your allowed origin(s)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.get('/',(req,res,next)=>{
  res.status(200).json({
    status:"success",
    message:"welcome to ewfl"
  })
})

const cookieSession = require('cookie-session');
// 3) ROUTES
app.use('/auth',oauthroutes);
app.use('/ewaste', stateroutes);
app.use('/user',userroutes)
app.use('/edevice',materialroutes);
// Export the Express.js app
module.exports = app;
