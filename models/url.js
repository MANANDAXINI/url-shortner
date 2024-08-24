const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    urldirect: {
        type: String,
        required: true
    },
    visithistory: [{
        timestamp: { type: Number }
    }]
}, { timestamps: true });  // Adds createdAt and updatedAt fields

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;
