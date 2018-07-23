var express = require("express"),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get('/', function(req, res) {
   res.send("Hello World!");
});

app.use(router);

// var BD= 'mongodb://JpgAngel:Jpg1407a@ds018568.mlab.com:18568/jpginvidentes'


// try {
//     mongoose.connect(BD, {useMongoClient: true});
//     console.log("Connected to database")
app.listen(3000, function() {
    console.log("Corriendo en http://localhost:3000");
    });
var conexion=require('./mongoDB/Conexion');
conexion.conectar().then((bd)=>{
    console.log("Connected to database"); 
});
// } catch (error) {
//     mongoose.createConnection(DB, {useMongoClient: true});
//     throw error;
// }
// mongoose.connection
//     .once('open', () => console.log('Connection has been sucessfully'))
//     .on('error', console.error.bind('Check the connection'))
      
var UsuariosCtrl = require('./controllers/UsuariosRet');
var LugaresCtrl=require('./controllers/LugaresRet');

// API routes
var UsuariosRouter = express.Router();

UsuariosRouter.route('/Usuarios')
    .get(UsuariosCtrl.findAllUsuarios)
    .post(UsuariosCtrl.addUsuarios);

UsuariosRouter.route('/Usuarios/:id')
    .get(UsuariosCtrl.findById)
    .put(UsuariosCtrl.updateUsuarios)
    .delete(UsuariosCtrl.deleteUsuarios);

UsuariosRouter.route('/Lugares')
    .get(LugaresCtrl.findAllLugares)
    .post(LugaresCtrl.addLugar);

UsuariosRouter.route('/Lugares/:Nombre')
    .get(LugaresCtrl.findLugarByNombre)
    .delete(LugaresCtrl.deleteLugar)
app.use('/api', UsuariosRouter);

