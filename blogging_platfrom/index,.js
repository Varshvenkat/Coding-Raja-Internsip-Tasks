const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import route files
const authRoutes = require("c:/Users/varsh/coding raja internship/blogging-platform/routes/authRoutes"); // Adjust path accordingly
const postRoutes = require("c:/Users/varsh/coding raja internship/blogging-platform/routes/postRoutes"); // Adjust path accordingly

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Connection URI
const uri = 'mongodb://localhost:27017';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process if connection fails
    }
}

// Call the function to connect to the database
connectToDatabase().then(() => {
    // Start the server after successful database connection
    const PORT = process.env.PORT || 3000; // Use port 3000 by default
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if connection fails
});

// Handle process termination events to gracefully close the MongoDB connection
process.on('SIGINT', async () => {
    try {
        await client.close();
        console.log('Disconnected from MongoDB');
        process.exit(0); // Exit the process gracefully
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        process.exit(1); // Exit the process with error status
    }
});
