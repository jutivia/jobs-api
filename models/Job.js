const mongoose = require('mongoose')
const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'please provide company name'],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, 'Kindly provide a position'],
        maxlength:100
    },
    status: {
        type: String,
        enum: {
            values: ['interview', 'declined', 'pending']
        },
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user ID']
    }
}, {timestamps: true})

module.exports = mongoose.model("Job", JobSchema);