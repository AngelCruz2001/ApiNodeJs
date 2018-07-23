var bdConexion;
var conexion=require('../mongoDB/Conexion');
conexion.conectar().then((bd)=>{
	bdConexion=bd; 	
});
var UsuariosCtrl = require('./Usuarios.js');

var LugaresFavGlobal;
exports.findLugaresFav=(req,res)=>{
    var Res=UsuariosCtrl.findAllUsuarios;
    
    console.log('GET/LugaresFav');
    bdConexion.collection("LugaresFav").find({}).toArray((err,LugaresFav)=>{
        if(err){
            res.json(err)
        }else{
            LugaresFavGlobal=LugaresFav;
            res.json({Datos:LugaresFav,Datos2:Res});
        }

    })

}
exports.addLugaresFav=(req,res)=>{
    console.log("POST/LugaresFav");
   
    var LugaresFavInfo = {
        "Nombre": req.body.Nombre,
        "NombreUsuario": req.body.NombreUsuario,
    }
            bdConexion.collection("LugaresFav").insertOne(LugaresFavInfo, (err)=>{
                if(err){
                    res.json(err)
                }else{
                    if(LugaresFavGlobal!=null){
                        res.json({success:true, SabiaQue:"Eres Perfecto", Get:LugaresFavGlobal});
                    }else{
                        res.json({success:false, SabiaQue:"no Eres Perfecto", Get:"Primero ejecuta el Get Tonto "})
                    }

                    
                }
            })
    }
    


exports.deleteLugaresFav = (req,res)=>{
    let query ={Nombre: req.params.Nombre}
    bdConexion.collection("LugaresFav").remove(query,(err)=>{
        if(err){
            res.json(err)
        }else{
            res.json({success:true,msj:"No hay error"})
        }
    })
}



