var express = require('express');
var routerMembre = express.Router();

var membreController=require('../controllers/MembreController');
var verifJWT = require('../controllers/UserController').verifJWT
routerMembre.use(verifJWT);

routerMembre.get('/',membreController.liste);
routerMembre.get('/:id',membreController.get)
routerMembre.post('/',membreController.ajout)
routerMembre.put('/',membreController.modification)
routerMembre.delete('/',membreController.suppression)
module.exports=routerMembre;