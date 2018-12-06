var express = require('express')
var app = express();
var bodyParser = require('body-parser');

let mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/collegefrance",{useNewUrlParser:true});

let db= mongoose.connection;
db.on('error', console.error.bind(console, 'erreur connexion :'));
db.once('open', function() {console.log('Connecté')});

var routerMembres = require("./app/routers/membreRouter");
var routerUser = require("./app/routers/userRouter");
app.use(bodyParser.json());

app.use('/api/membres',routerMembres)
app.use('/api/users',routerUser)

var port=5000;
app.listen(port);


console.log('le serveur REST est lancé sur le port '+port);
