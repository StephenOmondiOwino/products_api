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

app.use(cors());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// ✅ SWAGGER FIRST
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// ✅ THEN ROUTES
const productRoutes = require('./routes/products');
app.use('/products', productRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Products API running...');
});

// DB
const mongodb = require('./data/database');
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});