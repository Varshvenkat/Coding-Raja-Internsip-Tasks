const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Replace 'YourModel' with the name of your Mongoose model
const YourModel = require('../models/YourModel');

// POST request to add a new document to the database
router.post('/', async (req, res) => {
    try {
        // Create a new document instance using the request body
        const newDocument = new YourModel(req.body);

        // Save the document to the database
        const savedDocument = await newDocument.save();

        // Respond with the saved document
        res.status(201).json(savedDocument);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
