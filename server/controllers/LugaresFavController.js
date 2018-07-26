var {modelLugaresFav}=require('../models/LugaresFavoritos')
var buscar=require('./Lugar&Usuario');
var {modelUsuarios}=require('../models/UsuariosModel');
var {modelLugares}=require('../models/LugaresModel');
var mongoose=require('mongoose');
exports.addLugarFav=async(req,res)=>{
    
    var Lugar=req.body.Lugar;
    var UserName=req.body.UserNames.UserName;
    console.log('====================================');
    console.log(Lugar+"-------"+UserName);
    console.log('====================================');
    var Ids=[],lugfav;
   
    await buscar.buscarIdLugar(Lugar).then((idl)=>{
        Ids[0]=idl;
    });;
    await buscar.buscarIdUsuario(UserName).then((idu)=>{
        Ids[1]=idu;
    });
        console.log(Ids[0]+"    <=id lugar   y  id usuario=>   "+Ids[1]);
        if(Ids[0]!==undefined){
            if(Ids[1]!==undefined){
                
                await buscar.getLugarFav(Ids[0]).then((LugarFav)=>{
                    lugfav=LugarFav;
                    console.log(lugfav)
                });
                if(lugfav===undefined){
                    var LugarFav= new modelLugaresFav({

                        Lugar:Ids[0],
                        UserNames:{
                            UserName: Ids[1]
                        }
                    })
                    LugarFav.save((error)=>{
                        if(error)res.json({success:false,error});
                        else res.json({success:true,msj:"El lugar favorito se añadio"})
                     });
                }else{

                    // var Verde=lugfav.UserNames.UserName;
                    // console.log("verde"+typeof Verde);
                  
                    // var UserName1= Ids[1]
                    // var Data={Username1:UserName1};
                    // var Data1=JSON.stringify(Data);
                    // Data1=JSON.parse(Data1);
                    // console.log("Data"+typeof Data1);
                    // var json=Object.assign({},Verde,Data1)
                    
                    // console.log('====================================');
                    // console.log(json);
                    // console.log('====================================');
                    // var query={Lugar:Ids[0]}
                    // var up={$set:{UserNames:json}};
                    // modelLugaresFav.update(query,up,(error)=>{
                    //     if(error)res.json(error)
                    //     else res.json({success:true,msj:"Estas perro"});
                    // })
                }
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

exports.getLugaresFav=(req,res)=>{
    var id=req.params.id
    var lugsfavs=[];
    modelLugaresFav.find({UserNames:{UserName:id}},(err,Lugares)=>{
        modelLugares.populate(Lugares,{path:"Lugar"},(err,places)=>{
            for(var i=0;i<places.length;i++){
                lugsfavs[i]=places[i].Lugar; 
            } 
            console.log(lugsfavs)
            res.json({LugaresFav:lugsfavs});
        })
    })
}