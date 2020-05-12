const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const schedulesRoutes = require('./api/routes/schedules')
const usersRoutes = require('./api/routes/users')

mongoose.connect('mongodb+srv://admin:' + process.env.MONGO_ATLAS_PW + '@cluster0-avxwq.mongodb.net/test?retryWrites=true&w=majority', {
    // useMongoClient: true
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/schedules', schedulesRoutes)
app.use('/users', usersRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found')

    error.status = 404
    next(error)
})

app.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It Work!'
//     });
// });

module.exports = app
