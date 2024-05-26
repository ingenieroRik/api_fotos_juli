const express = require ("express");
const router = express.Router();

const mainControllers = require ("../controllers/mainController.js");

router.get("/", mainControllers.home);
router.get("/api/fotos", mainControllers.fotos);
router.get("/api/fotos/:id", mainControllers.foto);

router.get("/api/fotos/:id/img", mainControllers.foto_img);

router.get("/verlogin", mainControllers.verlogin);
router.post("/login", mainControllers.login);





module.exports = router;