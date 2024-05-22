const express = require ("express");

const path = require("path");
const adminControllers = require("../controllers/adminControllers");
let multer = require('multer');

const router = express.Router();

/* MULTER PARA SUBIR ARCHIVOS */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/images")
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

// *********************** Crear una foto **************************
router.get("/creacionFoto",adminControllers.creacionFoto);
router.post("/creacionFoto",upload.single("imagen"),adminControllers.procesoCreacion);

// ************************** Editar una foto **************************
//Renderiza la pagina de editar foto
router.get ('/edicionFoto/:id', adminControllers.edicionFoto);
//Procesa la edicion de la foto
router.put('/edicionFoto/:id', upload.single("imagen"), adminControllers.procesoEdicion);

/*
router.put('/edicionFoto/:id', upload.single("imagen"), (req, res, next) => {
    console.log(`Solicitud PUT recibida para editar foto con ID: ${req.params.id}`);
    console.log('Archivo subido:', req.file);
    console.log('Datos del formulario:', req.body);
    adminControllers.procesoEdicion(req, res, next);
});
*/

// ************************** Eliminar una foto **************************
//Elimina la foto
router.delete('/delete/:id', adminControllers.delete); //<-----  solo el administrador ingresa



// *********************** Mostrar la lista de fotos **********************
router.get("/verlista",adminControllers.verlista);
//router.get("/edit",adminControllers.edit );










module.exports = router;