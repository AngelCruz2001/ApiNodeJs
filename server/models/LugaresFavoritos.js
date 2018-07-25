var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var {modelUsuarios}=require('./UsuariosModel');
var {modelLugares}=require('./LugaresModel');
var LugaresFavShema = new Schema({
    Nombre:{type:Schema.Types.ObjectId,ref:modelLugares.name},
    UserName:{type:Schema.Types.ObjectId,ref:modelUsuarios.name}
})
exports.modelLugaresFav=mongoose.model('LugaresFav',LugaresFavShema);
//falta hacer que funcione el populate!!