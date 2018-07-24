var bdConexion;
var conexion=require('../mongoDB/Conexion');
conexion.conectar().then((bd)=>{
	bdConexion=bd; 	
});
var flagLugar=false;

var LugaresFavGlobal;
exports.findLugaresFav=(req,res)=>{
    var Nom=req.params.Nombre;
    console.log('GET/LugaresFav/'+Nom);    
    bdConexion.collection("Lugares").find({Nombre:Nom}).toArray((err,Lugar)=>{
        if(err){
            res.json(err)
        }else{
            
            if(Lugar.length>0){
                res.json({success:true,Lugar:Lugar[0].Nombre});
                flagLugar=true;
            }else{
                res.json({success:false,msj:"Upss este lugar no se encuentra registrado"});
                flagLugar=false;
            }
            
        }

    })

}
exports.addLugaresFav=(req,res)=>{
    console.log("POST/LugaresFav");
    
    if(flagLugar){
        var LugaresFavInfo = {
            "NombreUsuario": req.body.NombreUsuario,
        }
                bdConexion.collection("LugaresFav").insertOne(LugaresFavInfo, (err)=>{
                    if(err){
                        res.json(err)
                    }else{
                        res.json({success:true,msj:"El lugar se ha insertado"});
                    }
                })
    }else{
        res.json({success:false,msj:"No hay un lugar con ese nombre"});
    }
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



