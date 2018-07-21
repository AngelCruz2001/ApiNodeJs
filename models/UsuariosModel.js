
var mongoose = require('mongoose'),
Schema   = mongoose.Schema;

var Usuarios = new Schema({
Id:{type: Number},
Nombre:    { type: String },
NombreUsuario:     { type: String },
Edad:  { type: Number },
Domicilio:  { type: String },
Celular:  { type: String },
ContactoEmergencia:  { type: String },
Genero:  { type: String },
UbicacionActual:  { type: String }
});
var Usuario = mongoose.model('Usuario', Usuarios);
module.exports.Usuario = Usuario;