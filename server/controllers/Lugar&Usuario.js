var {modelUsuarios}=require('../models/UsuariosModel');
var {modelLugares}=require('../models/LugaresModel');
var {modelLugaresFav}=require('../models/LugaresFavoritos');
var id1,id2;
var FindLugar=(Nom)=>{
        return new Promise((resolve,reject)=>{
            modelLugares.find({Nombre:Nom},{_id:1},(error,idLugar)=>{
                if(error)res.json(error);
                else{
                    if(idLugar[0]!==undefined){
                        console.log("ID LUGAR"+idLugar[0]._id);
                        id1=idLugar[0]._id;
                    }else{
                        id1=undefined;
                    }
                    resolve(id1);
                }
            }); 
        })
    
}
var FindUsuario=(UserName)=>{
        return new Promise((resolve,reject)=>{
            modelUsuarios.find({UserName:UserName},{_id:1},(error,idUsuario)=>{
                if(error)res.json(error);
                else{
                    if(idUsuario[0]!==undefined){
                        console.log("ID USUARIO"+idUsuario[0]._id);
                        id2=idUsuario[0]._id
                    }else{
                        id2=undefined;
                    }
                    resolve(id2);
                }
    
            })
        });
 
}
var FindLugFav=(_id)=>{
    return new Promise((resolve,reject)=>{
        modelLugaresFav.find({Nombre:_id},(error,LugarFav)=>{
            if(error)res.json(error);
            else{
                resolve(LugarFav[0]);
            }
        });
    });
}
exports.getLugarFav=async(_id)=>{
    let LugFav= await FindLugFav(_id);
    return LugFav;
}
exports.buscarIdLugar=async(Nom)=>{
    let idL=await FindLugar(Nom);
    return idL;
}
exports.buscarIdUsuario=async(UserName)=>{
    let idU=await FindUsuario(UserName);
    return idU;
}

// exports.FindUsuario=(UserName)=>{
//     return new Promise((resolve,reject)=>{
//         modelUsuarios.find({UserName:UserName},{_id:1},(error,idUsuario)=>{
//             if(error)res.json(error);
//             else{
//                 console.log("ID USUARIO"+idUsuario[0]._id);
//                 resolve(idUsuario[0]._id);
//             }

//         })
//     })
// }