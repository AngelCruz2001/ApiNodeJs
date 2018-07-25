var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var LugarShema = new Schema({
    Lugar:String,
    Ubicacion:String,
    Horario:{
        Apertura:String,
        Cierre:String 
    }
});
var modelLugares=mongoose.model('lugares',LugarShema);
module.exports.modelLugares=modelLugares;