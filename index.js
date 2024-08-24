const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8001;

const Url = require('./models/url');
const urlRoute = require('./routes/url');
const { connectmongodb } = require("./connect");

// Connect to MongoDB
connectmongodb('mongodb://localhost:27017/shorturl')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.json()); // To parse JSON bodies

// Routes
app.use('/url', urlRoute);

// GET route to handle redirection
app.get('/:shortId', async (req, res) => {
    const { shortId } = req.params;  // Correctly extract shortId from the URL params

    try {
        // Find the entry in the database using the shortId
        const entry = await Url.findOneAndUpdate(
            { shortId },  // Find the document by shortId
            { $push: { visithistory: { timestamp: Date.now() } } },  // Update visit history
            { new: true }  // Return the updated document
        );

        // If no entry is found, send a 404 response
        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        // Redirect to the original URL
        res.redirect(entry.urldirect);
    } catch (error) {
        console.error("Error during redirection:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at: ${PORT}`);
});
