var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var {modelUsuarios}=require('./UsuariosModel');
var {modelLugares}=require('./LugaresModel');
var LugaresFavShema = new Schema({
    Lugar:{type:Schema.Types.ObjectId,ref:modelLugares.name},
    UserNames:{
        UserName:{type:Schema.Types.ObjectId,ref:modelUsuarios.name},
        UserName1:{type:Schema.Types.ObjectId,ref:modelUsuarios.name}
    }
})
exports.modelLugaresFav=mongoose.model('LugaresFav',LugaresFavShema);