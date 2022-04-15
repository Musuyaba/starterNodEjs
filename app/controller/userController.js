const userModel = require('../models/userModel')

exports.create = function (req, res) {
    if (!req.body) {
        res.status(400).send({
            messange: "Data content empty!"
        });
        return;
    }

    const user = new userModel({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
    });

    user.save().then(function (data) {
        res.status(201).json({
            messange: "Success",
            data: data,
        })
    }).catch(function (err) {
        console.log(err)
        res.status(500).send({
            messange: err.message,
        })
    })

}

exports.find = function (req, res) {
    if (req.query.email) {
        const email = req.query.email;

        userModel.findOne({
            email: email,
        }).then(function (data) {
            if (!data) {
                res.status(404).send({
                    messange: "Data not found : " + email,
                })
            } else {
                res.json({
                    messange: "Data found !",
                    data: data,
                })
            }
        }).catch(function (err) {
            res.status(500).send({
                messange: err.messange,
            })
        })
    } else {
        userModel.find().then(function (data) {
            res.json({
                messange: "Success get all data user",
                data: data,
            })
        }).catch(function (err) {
            res.status(500).send({
                messange: err.messange,
            })
        })
    }
}

exports.update = function (req, res) {
    try {
        userModel.findOneAndUpdate({
            "email": req.params.email,
        }, req.body, { new: true }).then(function (data) {
            if (!data) {
                res.status(404).send({
                    messange: "Cannot Update user with email " + req.params.email,
                })
            } else {
                res.json({
                    messange: "Success update data user",
                    data: data,
                })
            }
        })
    } catch (err) {
        res.status(500).send({
            messange: err.messange,
        })
    }
}

exports.delete = function (req, res) {
    userModel.findOneAndDelete({
        'email': req.params.email,
    }).then(function (data) {
        if (!data) {
            res.status(404).send({
                messange: "Cannot delete user with email" + req.params.email,
            })
        } else {
            res.json({
                messange: "Success delete data user",
            })
        }
    })
}