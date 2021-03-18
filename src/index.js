const express = require('express');
const env = require('dotenv');
const app = express();
const connectDB = require('./config/db');

// routes
const userRoutes = require('./routes/user');

// environmentactual data
env.config();

// Parser => json to
app.use(express.json());

// Database connect
connectDB();

// Routes
app.use('/api', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server running http://localhost:${process.env.PORT}`);
});
