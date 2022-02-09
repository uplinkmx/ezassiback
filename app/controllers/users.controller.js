const db = require("../models");
const Usuarios = db.usuarios;

const Perfiles = db.perfiles;
const Op = db.Sequelize.Op;


exports.obtenerUsuarios = (req, res) => {

    Usuarios.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "ocurrio un error al obtener la informacion."
            });
        });
};

exports.obtenerPerfiles = (req, res) => {

    Perfiles.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "ocurrio un error al obtener la informacion."
            });
        });
};

exports.obtenerUsuario = (req, res) => {
    console.log(req.body);

    Usuarios.findOne({
        where: {
            id: req.body.userId
        }
    })
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "ocurrio un error al obtener la informacion."
            });
        });
};

exports.allAccess = (req, res) => {
    res.status(200).send("Bienvenidos al sitio esta informacion se obtuvo desde la api en localhost:8070.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("contenido del usuario.");
};
