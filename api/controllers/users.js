const mongoose = require('mongoose');
const users = require('../../models/users');
const api = {};

api.get = (req, res, next) => {
    users.find()
    .exec()
    .then(docs => {
        console.log(docs);
        if (docs.length >= 0) {
            res.status(200).json(docs);
        }
        else {
            res.status(404).json({
                message: 'No entries found'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

api.post = (req, res, next) => {
    
    console.log("passei aqui");

    const user = new users({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        login: req.body.login,
        password: req.body.password
    });

    console.log("passei aqui 2");

    user
    .save()
    .then(result => {
        console.log(result);

        res.status(201).json({
            message: 'Handling POST request to /users',
            createduser: user
        });

    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });    
}

api.getuserId = (req, res, next) => {
    const id = req.params.userId;
    users.findById(id)
    .exec()
    .then(doc => {
        console.log("From database", doc);

        if (doc) {
            res.status(200).json(doc);
        }
        else {
            res.status(404).json({
                message: 'No valid entry found for provided ID'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

api.patch = (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    users.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

api.delete = (req, res, next) => {
    const id = req.params.userId;
    
    users.deleteOne({_id: id})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

module.exports = api;