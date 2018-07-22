
var urlBD= 'mongodb://JpgAngel:Jpg1407a@ds018568.mlab.com:18568/jpginvidentes';
var bd;
var {MongoClient}=require('mongodb');
var ObjectId = require('mongodb').ObjectID;
MongoClient.connect(urlBD,{ useNewUrlParser: true },(err,db)=>{
	if(err)throw err;
	else{
		bd=db.db("jpginvidentes");
		console.log("Connected to database");
	}
});


var {Usuario}=require('../models/UsuariosModel');
findAllUsuarios = (req, res)=> {
	bd.collection("usuarios").find({}).toArray((err, usuarios) =>{
    if(err) res.send(500, err.message);
    console.log('GET /Usuarios')
		res.send(usuarios[0]); //WOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOW
	});
};

findById =(req, res)=>{
	var id=parseInt(req.params.id);
	bd.collection("usuarios").find({Id:id}).toArray((err, usuarios) =>{
    if(err) return res.send(500, err.message);

    console.log('GET /Usuarios/' + req.params.id);
		res.json(usuarios);
	});
};
addUsuarios =(req, res)=> {
	console.log('POST');
	var usuarioNuevo ={
		Id:    req.body.Id,
		Nombre: 	  req.body.Nombre,
		NombreUsuario:  req.body.NombreUsuario,
		Edad:   req.body.Edad,
		Domicilio:  req.body.Domicilio,
		Celular:    req.body.Celular,
		ContactoEmergencia:  req.body.ContactoEmergencia,
		Genero:  req.body.Genero,
		UbicacionActual:  req.body.UbicacionActual,
	};
	bd.collection("usuarios").insertOne(usuarioNuevo,(error)=>{
		if(error){
			res.json(error.message)
		}
		else {
			res.json({success:true,user:usuarioNuevo})
			console.log("Usuario insertado");
		}
	});
	
};

exports.updateUsuarios = function(req, res) {
	let id=parseInt(req.params.id);
	var datosNuevos={$set:{Id :    req.body.Id,
		Nombre : 	  req.body.Nombre,
		NombreUsuario :  req.body.NombreUsuario,
		Edad :   req.body.Edad,
		Domicilio :  req.body.Domicilio,
		Celular :    req.body.Celular,
		ContactoEmergencia :  req.body.ContactoEmergencia,
		Genero :  req.body.Genero,
		UbicacionActual :  req.body.UbicacionActual}
		}
		var query={Id:id}
	bd.collection("usuarios").updateOne(query,datosNuevos,function(err, Usuario) {
		if(err)res.json(err.message);
		else res.json({success:true,Msj:"Se hizo la actualizacion correctamente"});
	});
};

exports.deleteUsuarios = function(req, res) {
		var id=parseInt(req.params.id);
		console.log(id)
		let Valores={"Id":id}
		// db.test_users.remove({"_id": ObjectId("4d512b45cc9374271b02ec4f")})
		try {
			bd.collection("usuarios").deleteOne( Valores );
			res.json({success:true,Msj:"Funciono borraste el unico registro"})
		 } catch (e) {
			print(e);
		 }	
		// bd.collection("usuarios").deleteOne(Valores, function(err, obj) {
		// 	if (err) throw err;
		// 	console.log(obj.result.n + " document(s) deleted");
		// 	// bd.close();
		//   });
	
		// 	Usuarios.remove(function(err) {
	// 		if(err) return res.status(500).send(err.message);
    //   res.status(200).send();
	// 	})
};
exports.findAllUsuarios=findAllUsuarios;
exports.addUsuarios=addUsuarios;
exports.findById=findById;