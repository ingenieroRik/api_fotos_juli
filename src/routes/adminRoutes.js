const express = require ("express");

const path = require("path");
const adminControllers = require("../controllers/adminControllers");
let multer = require('multer');


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
const router = express.Router();

// *********************** Crear una foto **************************
router.get("/creacionFoto",adminControllers.creacionFoto);
router.post("/creacionFoto",upload.single("imagen"),adminControllers.procesoCreacion);

// ************************** Editar una foto **************************
//Renderiza la pagina de editar foto
router.get ('/edicionProduct/:id', adminControllers.edicionProd);
//Procesa la edicion de la foto
router.put('/edicionProduct/:id', upload.single("imagen"), adminControllers.procesoEdicion);


// ************************** Eliminar una foto **************************
//Elimina la foto
router.delete('/delete/:id', adminControllers.delete); //<-----  solo el administrador ingresa



// *********************** Mostrar la lista de fotos **********************
router.get("/verlista",adminControllers.verlista);
//router.get("/edit",adminControllers.edit );










module.exports = router;