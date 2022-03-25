const mongoose = require('mongoose');

const PositionSchema = mongoose.Schema({
    name_role: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    role: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Position', PositionSchema);