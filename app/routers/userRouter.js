var express = require('express');
var userMembre = express.Router();

var userController=require('../controllers/UserController')

userMembre.get('/auth',userController.demandejeton)
userMembre.get('/token',userController.verifJWT)
userMembre.post('/',userController.ajout)
userMembre.get('/',userController.verifJWT,userController.verifAdmin,userController.liste)

module.exports=userMembre;