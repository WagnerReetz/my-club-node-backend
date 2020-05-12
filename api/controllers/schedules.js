const mongoose = require('mongoose')
const Schedules = require('../../models/schedules')
const api = {}

api.get = (req, res, next) => {
    Schedules.find()
        .exec()
        .then((docs) => {
            console.log(docs)
            if (docs.length >= 0) {
                res.status(200).json(docs)
            } else {
                res.status(404).json({
                    message: 'No entries found'
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

api.post = (req, res, next) => {
    const schedule = new Schedules({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        dateBegin: req.body.dateBegin,
        dateEnd: req.body.dateEnd,
        users: req.body.users
    })

    schedule
        .save()
        .then((result) => {
            console.log(result)

            res.status(201).json({
                message: 'Handling POST request to /schedules',
                createdschedule: schedule
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

api.getscheduleId = (req, res, next) => {
    const id = req.params.scheduleId

    Schedules.findById(id)
        .exec()
        .then((doc) => {
            console.log('From database', doc)

            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: err })
        })
}

api.patch = (req, res, next) => {
    const id = req.params.scheduleId
    const updateOps = {}

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    Schedules.update({ _id: id }, { $set: updateOps })
        .exec()
        .then((result) => {
            console.log(result)
            res.status(200).json(result)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

api.delete = (req, res, next) => {
    const id = req.params.scheduleId

    Schedules.deleteOne({ _id: id })
        .exec()
        .then((result) => {
            console.log(result)
            res.status(200).json(result)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

module.exports = api
