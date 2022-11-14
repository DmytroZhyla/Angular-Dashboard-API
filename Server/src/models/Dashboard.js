const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String, required: true, unique: false
    },
    description: {
        type: String, required: true, unique: false
    },
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId, required: false
    }

}, {timestamps: {createdAt: "created_date"}, updatedAt: true});

let Dashboard = mongoose.model('Dashboard', schema)

module.exports = {
    Dashboard,
};
