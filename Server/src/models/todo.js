const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: Array,
        required: false,
    },
    assigned_to_board: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
    }
}, {timestamps: {createdAt: "created_date"},updatedAt:false});

let Todo = mongoose.model('Todo', schema)

module.exports = {
    Todo
};
