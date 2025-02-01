const mongoose = require('mongoose');

const student_schema = new mongoose.Schema({
    rollNo: {
        type: Number,
        unique: true,
        required: true
    },
    name: String,
    degree: String,
    city: String
});

module.exports = mongoose.model('Student', student_schema);
