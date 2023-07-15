const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator")

const RiderSchema = new Schema({
    Id: {
        type: Number,
        required: true, // Set to true if Id is required
        default: null, // Specify a default value if needed
    },
    Name: String,
    Email: {
        type: String,
        required: [true, 'Please enter email.'],
        unique: true, // Add this line
        validate: [validator.isEmail, 'Please enter a valid email.']
    },
    Position: String,
    NRIC: String,
    Status: Boolean,
    Image: String,
    cloudinary_id: String
})

module.exports = mongoose.model("Riders", RiderSchema)