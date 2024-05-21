const express = require ("express");
const router = express.Router();

const mainControllers = require ("../controllers/mainController.js");

//router.get("/", mainControllers.home);
//router.get("/contact", mainControllers.contact);
//router.get("/lista", mainControllers.lista);

//router.post("/lista", mainControllers.lista);

router.get("/verlogin", mainControllers.verlogin);
router.post("/login", mainControllers.login);





module.exports = router;