const mongoose = require('mongoose')

const URLSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
        trim: true
    },
    shortCode: {
        type: String,
        required: true,
        unique: true
    },
    countClick: {
        type: Number,
        default: 0
    },
    expiresAt: {
        type: Date,
        default: null
    }

}, { timestamps: true })

const Url = mongoose.model("Url", URLSchema)

module.exports = Url