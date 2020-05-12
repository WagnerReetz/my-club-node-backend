const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    phone: String,
    login: String,
    password: String
});

module.exports = mongoose.model('Users', usersSchema);
