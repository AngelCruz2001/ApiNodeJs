var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var {Usuario}=require('../models/UsuariosModel');
findAllUsuarios = (req, res)=> {
	console.log("Entro aqui al findAllUsuarios");
	
	Usuario.find(function(err, Usuarios) {
    if(err) res.send(500, err.message);

    console.log('GET /Usuarios')
		res.status(200).json(Usuarios);
	});
};

exports.findById = function(req, res) {
	Usuarios.findById(req.params.Id, function(err, Usuarios) {
    if(err) return res.send(500, err.message);

    console.log('GET /Usuarios/' + req.params.Id);
		res.status(200).jsonp(Usuarios);
	});
};
addUsuarios =(req, res)=> {
	console.log('POST');
	console.log("entro aqui primero"+req.body.Id);

	var usuario = new Usuario({
		Id:    req.body.Id,
		Nombre: 	  req.body.Nombre,
		NombreUsuario:  req.body.NombreUsuario,
		Edad:   req.body.Edad,
		Domicilio:  req.body.Domicilio,
		Celular:    req.body.Celular,
		ContactoEmergencia:  req.body.ContactoEmergencia,
		Genero:  req.body.Genero,
		UbicacionActual:  req.body.UbicacionActual,

	});

	
	usuario.save(function(err, usuario){
		if(err) return res.status(500).send( err.message);
		console.log("Todo bien");
		res.json(usuario);
	});
	
};

exports.updateUsuarios = function(req, res) {
	Usuarios.findById(req.params.Id, function(err, Usuarios) {
        Usuarios.Id =    req.body.Id,
		Usuarios.Nombre = 	  req.body.Nombre,
		Usuarios.NombreUsuario =  req.body.NombreUsuario,
		Usuarios.Edad =   req.body.Edad,
		Usuarios.Domicilio =  req.body.Domicilio,
		Usuarios.Celular =    req.body.Celular,
		Usuarios.ContactoEmergencia =  req.body.ContactoEmergencia,
		Usuarios.Genero =  req.body.Genero,
		Usuarios.UbicacionActual =  req.body.UbicacionActual

		Usuarios.save(function(err) {
			if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(Usuarios);
		});
	});
};

exports.deleteUsuarios = function(req, res) {
	Usuarios.findById(req.params.Id, function(err, Usuarios) {
		Usuarios.remove(function(err) {
			if(err) return res.status(500).send(err.message);
      res.status(200).send();
		})
	});
};
exports.findAllUsuarios=findAllUsuarios;
exports.addUsuarios=addUsuarios;