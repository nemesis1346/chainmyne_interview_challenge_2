const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = `mongodb+srv://marcomaigua1346:${process.env.MONGO_DB_ATLAS}@cluster0.a99up.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tls=true`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, ssl: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit on DB connection error
  }
};

module.exports = connectDB;
