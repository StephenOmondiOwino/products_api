require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

//  SESSION (MUST COME BEFORE PASSPORT)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

//  PASSPORT
app.use(passport.initialize());
app.use(passport.session());

//  AUTH ROUTES
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

//  SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//  API ROUTES
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const customerRoutes = require('./routes/customers');

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/customers', customerRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Products API running...');
});

//  DATABASE CONNECTION
const mongodb = require('./data/database');

if (process.env.NODE_ENV !== 'test') {
  const mongodb = require('./data/database');

  mongodb.initDb((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Database connected');

      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  });
};
      

// EXPORT FOR TESTING
module.exports = app;