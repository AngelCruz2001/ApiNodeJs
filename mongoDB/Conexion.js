var {MongoClient}=require('mongodb');
var urlBD= 'mongodb://JpgAngel:Jpg1407a@ds018568.mlab.com:18568/jpginvidentes';
var bd;
conectar=()=>{
   return new Promise((resolve,reject)=>{
        MongoClient.connect(urlBD,{ useNewUrlParser: true },(err,db)=>{
            if(err)throw err;
            else{
            bd=db.db("jpginvidentes");
            resolve(bd);
            }
        });
   });

}

exports.conectar=conectar;


