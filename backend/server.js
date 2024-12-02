// Load environment variables from .env file
require('dotenv').config(); 

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

// Initialize the app
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable parsing of JSON payloads

// Define application routes
app.use('/users', userRoutes);
app.use('/employees', employeeRoutes);

// Configure Mongoose to avoid deprecation warnings
mongoose.set('strictQuery', true);

// Define the port and database URI from environment variables
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  console.error('Error: The database URI (DB_URI) is not defined in your environment variables.');
  process.exit(1);
}

// Connect to the database and start the server
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
