
var bdConexion;
var conexion=require('../mongoDB/Conexion');
conexion.conectar().then((bd)=>{
	bdConexion=bd; 	
});
exports.findAllUsuarios = (req, res)=> {
	console.log('GET /Usuarios')
	bdConexion.collection("usuarios").find({}).toArray((err, usuarios) =>{
    if(err) res.send(500, err.message);
	res.send(usuarios);
	});
};

exports.findById =(req, res)=>{
	console.log('GET /Usuarios/' + req.params.id);
	var id=parseInt(req.params.id);
	bdConexion.collection("usuarios").find({Id:id}).toArray((err, usuarios) =>{
    if(err) return res.send(500, err.message);
	res.json(usuarios);
	});

};
exports.addUsuarios =(req, res)=> {
	console.log('POST/Usuarios');
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
	bdConexion.collection("usuarios").insertOne(usuarioNuevo,(error)=>{
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
	console.log('UPDATE/Usuarios');
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
	bdConexion.collection("usuarios").updateOne(query,datosNuevos,function(err, Usuario) {
		if(err)res.json(err.message);
		else res.json({success:true,Msj:"Se hizo la actualizacion correctamente"});
	});


};

exports.deleteUsuarios = function(req, res) {
	console.log('DELETE/Usuarios');
	var id=parseInt(req.params.id);	
	var query={Id:id}
	bdConexion.collection("usuarios").remove(query,function(err) {
		if(err) return res.status(500).send(err.message);
      	else res.json({success:true,Msj:"El usuario se elimino con exito"});;
		})
	
	
};
