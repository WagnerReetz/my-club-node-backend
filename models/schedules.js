const mongoose = require('mongoose');

const schedulesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    dateBegin: Date,
    dateEnd: Date,
    users: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
    ]
});

module.exports = mongoose.model('schedules', schedulesSchema);