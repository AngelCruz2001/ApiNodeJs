var {modelLugaresFav}=require('../models/LugaresFavoritos')
var buscar=require('./Lugar&Usuario');

exports.addLugarFav=(req,res)=>{
    var Nom=req.body.Nombre;
    var UN=req.body.UserName;
    var _idLugar,_idUsuario,Ids=[];

    buscar.FindLugar(Nom,UN).then((ids)=>{
        // _idLugar=id1;
        // _idUsuario=id2;
        Ids[0]=ids[0];
        Ids[1]=ids[1];
        console.log(ids);
        
    })
    // buscar.FindUsuario(UN).then((idUsuario)=>{
    //     _idUsuario=idUsuario
    // });
    setTimeout(() => {
        var LugarFav= new modelLugaresFav({
            Nombre:Ids[0],
            UserName:Ids[1]
        })
        console.log(Ids[0]+"    <=id lugar   y  id usuario=>   "+Ids[1]);
        if(Ids[0]!==undefined && Ids[1]!==undefined){
            LugarFav.save((error)=>{
                if(error)res.json({success:false,error});
                else res.json({success:true,msj:"El lugar favorito se añadio"})
    });
        }else{
            res.status(500).json({success:false,msj:"Algunos de los datos no es correcto"});
        }
   
    }, 000);
}
exports.findLugaresFav=(req,res)=>{
    modelLugaresFav.find({},(error,result)=>{
        if(error)res.json(error);
        else res.json(result);

    })
}

exports.removeLugarFav=(req,res)=>{
    let query={"_id": req.params._id};
    modelLugaresFav.remove(query,(err)=>{
        if(err){
            res.json(err)
        }else{
            res.json({success:true,msj:"No hay error"})
        }
    })
}