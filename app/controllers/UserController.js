var UserModel = require('../models/UserModel');
var jwt = require('jsonwebtoken');
var UserController =
{
    liste: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                console.log(err);
                res.json({ status: false, message: err.message });
            }
            else {
                res.json({ status: true, users: users });
            }
        });
    },

    ajout: function (req, res) {
        console.log(req.body)
        var user = new UserModel(req.body.user);
        user.validate()
            .then(() => {
                return user.save()
            })
            .then(() => res.json({ status: true, message: "user ajouté" }))
            .catch((err) => res.json({ status: false, message: "user validation failed " + err.message }))
    },

    demandejeton: function (req, res) {
        var name = req.query.name;
        var pwd = req.query.password;
        console.log(name + "      " + pwd)
        UserModel.findOne({ name: name, password: pwd }, function (err, user) {
            if (err) {
                console.log(err);
                res.json({ status: false, message: "name et/ou password absents" });
            }
            else {
                if (name == user.name && user.password == pwd) {
                    var payload = { "name": user.name, "password": user.password, "admin": user.admin };
                    var token = jwt.sign(payload, 'maclesecrete', { expiresIn: '1h' });
                    res.json({ status: true, token: token });
                }
                else {
                    res.json({ status: false, message: "name et/ou password incorrects" });
                }
            }
        });
    },

    verifJWT: function (req, res, next) {
        var token = req.query.token;
        console.log(token)
        if (token == null) {
            res.json({ status: false, mess: "jeton null" });
        }
        else {
            jwt.verify(token, 'maclesecrete',
                function (err, payload) {
                    if (err) {
                        res.json({ status: false, message: "jeton incorrect" });
                        return err;
                    }
                    else {
                        console.log(payload)
                        req.payload = payload
                        next();
                    }
                });

        }
    },

    verifAdmin: function (req, res,next) {
        var payload = req.payload
        console.log(payload)
        if (payload.admin) {
            next();
        }
        else 
        {
            res.json({ status: false, message: "Vous n'avez pas les droits suffisants pour accéder à ces données" });
        }
    }
}


module.exports = UserController;
