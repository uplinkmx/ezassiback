const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var bcrypt = require("bcryptjs");

const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();
// enable files upload
app.use(fileUpload({
    createParentPath: true
}));
app.use(morgan('dev'));
app.use(express.static('uploads'));
// cors configuration to accept conections on localhost on port 4200
var corsOptions = {
    origin: "http://localhost:4200"
};

//obtain all models and sincronize squelize
const db = require("./app/models");
const Role = db.profiles;
const users = db.users;
db.sequelize.sync();

// uncomment to reset database 
/*
db.sequelize.sync({force: true}).then(() => {
   console.log('tirar y sincronizar db.');
   initial();
 });
*/
function initial() {
    users.create({
        id: 1,
        username: "miusuario",
        password: bcrypt.hashSync("password", 8),
        mail: "micorreo@gmail.com",
        phone: "3311494217",
        status: 1,
        perfil_id: 3
    });

    Role.create({
        id: 1,
        name: "user",
        description: "User"
    });

    Role.create({
        id: 2,
        name: "moderator",
        description: "Moderator"
    });

    Role.create({
        id: 3,
        name: "admin",
        description: "User Admisnitration"
    });
}


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// simple route
app.get("/", (req, res) => {
    res.json({message: "Funciona!!."});
});

// set port, listen for requests
const PORT = process.env.PORT || 8070;
//requires of all routes in the app
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/post.routes')(app);

app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
      console.log(r.route.path)
    }
  })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
