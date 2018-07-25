var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var {modelUsuarios}=require('./UsuariosModel');
var {modelLugares}=require('./LugaresModel');
var LugaresFavShema = new Schema({
    Nombre:{type:Schema.Types.ObjectId,ref:modelUsuarios},
    UserName:{type:Schema.Types.ObjectId,ref:modelLugares}
})
exports.modelLugaresFav=mongoose.model('LugaresFav',LugaresFavShema);
//falta hacer que funcione el populate!!