var {modelLugaresFav}=require('../models/LugaresFavoritos')
var buscar=require('./Lugar&Usuario');
var {modelUsuarios}=require('../models/UsuariosModel');
var {modelLugares}=require('../models/LugaresModel');
exports.addLugarFav=async(req,res)=>{
    console.log(req.body.Nombre+"-------"+req.body.UserName);
    var Nom=req.body.Nombre;
    var UserName=req.body.UserName;
    var Ids=[],lugfav;
   
    await buscar.buscarIdLugar(Nom).then((idl)=>{
        Ids[0]=idl;
    });;
    await buscar.buscarIdUsuario(UserName).then((idu)=>{
        Ids[1]=idu;
    });
        var LugarFav= new modelLugaresFav({
            Lugar:Ids[0],
            UserName:Ids[1]
        })
        console.log(Ids[0]+"    <=id lugar   y  id usuario=>   "+Ids[1]);
    
        if(Ids[0]!==undefined){
            if(Ids[1]!==undefined){
                await buscar.getLugarFav(Ids[0]).then((LugarFav)=>{
                    lugfav=LugarFav;
                });
                LugarFav.save((error)=>{
                    if(error)res.json({success:false,error});
                    else res.json({success:true,msj:"El lugar favorito se añadio"})
                 });
            }else{
                res.status(406).json({success:false,msj:"El no existe el usuario que intenta agregar un lugar favorito"})
            } 
        }else{
            res.status(406).json({success:false,msj:"El lugar que intenta poner como favorito no existe"})
        }
            
       

    
}
exports.findLugaresFav=(req,res)=>{

    modelLugaresFav.find({},(err,Lugares)=>{
        modelLugares.populate(Lugares,{path:"Lugar"},(err,places)=>{
            res.json(places);
        })
    })
    // modelLugaresFav.find({})
    // .select("Nombre UserName _Id")
    // .populate(modelLugares.name)
    // .exec()
    // .then(Lugares=>{
    //         res.json({
    //             success:true,
    //             orders: Lugares.map(Lugares => {
    //                 return {
    //                   _id: Lugares._id,
    //                   Nombre: Lugares.Nombre,
    //                   UserName: Lugares.UserName,
    //                   request: {
    //                     type: "GET",
    //                     url: "http://localhost:3000/orders/" + Lugares._id
    //                   }
    //                 };
    //             })
    //         })
    //         .catch(err => {
    //             res.status(500).json({
    //               error: err
    //             });
            // })
    // })
    
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