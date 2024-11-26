require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connect = require('./config/db');
const bodyParser = require('body-parser');
const Routes = require('./routes/index');
const {seedDatabase} = require('./controllers/cities');


const app = express();
app.use(cors());


// Connect to MongoDB database
connect();

// Seed the database with initial data
seedDatabase()

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', Routes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
