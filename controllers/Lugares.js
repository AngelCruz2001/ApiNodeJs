var bdConexion;
var conexion=require('../mongoDB/Conexion');
bdconexion=conexion.conectar().then((bd)=>{
	 bdConexion=bd; 
});
exports.findAllLugares=(req,res)=>{
    console.log('GET/Lugares');
    bdConexion.collection("Lugares").find({}).toArray((error,Lugares)=>{
        if(error)res.json(error.messege);
        res.json(Lugares);
    });
}
exports.findLugarByNombre=(req,res)=>{
    console.log("GET/Lugares/"+req.params.Nombre);
    var Nom=req.params.Nombre;
    var query={Nombre:Nom};
    bdConexion.collection("Lugares").find(query).toArray((error,Lugar)=>{
        if(error)res.json(error.messege);
        else res.json(Lugar);
    })
}
exports.addLugar=(req,res)=>{
    console.log('POST/Lugares');
    var lugarNuevo={
        Nombre:req.body.Nombre,
        Ubicacion:req.body.Ubicacion,
        Horario:{
            Apertura:req.body.Horario.Apertura,
            Cierre:req.body.Horario.Cierre
        }
    }
    bdConexion.collection("Lugares").insertOne(lugarNuevo,(err)=>{
        if(err)res.json(err.messege);
        else res.json({success:true,Mjs:"El lugar se inserto correctamente"});
    });
}
exports.updateLugar=(req,res)=>{
    console.log('PUT/Lugares/'+req.params.Nombre);
    var Nom=req.params.Nombre;
    var query={Nombre:Nom};
    var datosNvos={$set:{Nombre:Nom,
        Ubicacion:req.body.Ubicacion,
        Horario:{
            Apertura:req.body.Horario.Apertura,
            Cierre:req.body.Horario.Cierre
        }}
    }

    bdConexion.collection("Lugares").updateOne(query,datosNvos,(error)=>{
        console.log("entro aqui");
        
        if(error)res.json(error);
        else res.json({success:true,Msj:"El lugar se actualizo correctamente"});
    });
    
}
exports.deleteLugar=(req,res)=>{
    console.log("DELETE/Lugares/"+req.params.Nombre);
    var Nom=req.params.Nombre;
    var query={Nombre:Nom};
    bdConexion.collection("Lugares").remove(query,(error)=>{
        if(error)res.json(error.messege);
        else res.json({success:true,Mjs:"El lugar se elimino correctamente"});
    })
}