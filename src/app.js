const express = require ("express");
require('dotenv').config();
const app = express();
const path = require('path');
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE
const fs = require("fs");
const cors = require ('cors'); // <--------- para que puedan ver los datos de nuestra api  hacer  --> npm i cors
//const fotosController = require("./controllers/fotosController");

app.use(cors());
app.use(methodOverride('_method')); // Para poder usar los métodos PUT y DELETE
app.use(express.urlencoded({extended:false})); // MUY IMPORTANTE!!!  para usar el metodo POST
app.use(express.json()); // MUY IMPORTANTE!!!  para usar el metodo POST

// indicamos a express usar la plantilla EJS que esta en carpeta views.
app.set('view engine', 'ejs');

//si la ruta por defecto no es /views debemos decirle a node que la carpeta se encuentra
// en otra ruta, para ello usamos:
app.set('views', './src/views');

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

const fotosFilePath = path.join(__dirname, "data/db_fotos.json");
const db_fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8"));
/* En la constante "db_fotos" ya tenemos los fotos que están 
guardados en la carpeta data como Json (un array de objetos literales) */

app.get("/", (req,res) =>{

    res.render("index.ejs", { fotos : db_fotos }); 
});

app.get("/api/fotos", (req,res) => {
   
    res.send(db_fotos);
});

app.get("/api/fotos/:id", (req,res) => {
   
    const foto = db_fotos.find(c => c.id === parseInt(req.params.id));
    if (!foto) return res.status(404).send("Foto no encontrada");
    else res.send(foto);
});



app.get("/api/fotos/:id/img", (req, res) => {
    const foto = db_fotos.find(c => c.id === parseInt(req.params.id));
    if (!foto) return res.status(404).send("Foto no encontrada");

    else res.sendFile(path.join(__dirname,'../public/images', foto.img));
});


/*
   // Ajusta la ruta para la nueva estructura del proyecto
   const imagePath = path.join(__dirname, '../public/images', foto.img);
   fs.access(imagePath, fs.constants.F_OK, (err) => {
       if (err) {
           console.error(File not found: ${imagePath});
           return res.status(404).send("Foto no encontrada");
       }
       res.sendFile(imagePath);
   });
*/




const adminRoutes = require ("./routes/adminRoutes.js");
const mainRoutes = require ("./routes/mainRoutes.js");

app.use (adminRoutes);
app.use (mainRoutes);

// ponemos a escuchar el servidor
app.listen(process.env.PORT || 3042, () =>  // si subimos a un hosting este nos dará el puerto, sinó sera 3042
console.log('Servidor corriendo en http://localhost:3042')
);
