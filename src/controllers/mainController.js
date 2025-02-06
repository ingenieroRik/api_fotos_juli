const path = require("path");
const { json } = require("express");

const fs = require("fs");
const fotosFilePath = path.join(__dirname, "../data/db_fotos.json");
//const db_fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8"));

const mainControllers = {

        home: (req,res) => {
            const db_fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8")); // Leer archivo cada vez
            return res.render("index.ejs", { fotos : db_fotos }); 
        },
        
       


        fotos: (req,res) => {
            const db_fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8")); // Leer archivo cada vez
            return res.send(db_fotos);
        },

        foto: (req,res) => {
   
            const foto = db_fotos.find(c => c.id === parseInt(req.params.id));
            if (!foto) return res.status(404).send("Foto no encontrada");
            else return res.send(foto);
        },
        
        foto_img : (req, res) => {

            const db_fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8")); // Leer archivo cada vez       5/2/2025

            const foto = db_fotos.find(c => c.id === parseInt(req.params.id));
            if (!foto) return res.status(404).send("Foto no encontrada");
        
            else res.sendFile(path.join(__dirname,'../../public/images', foto.img));
        },

        verlogin: (req,res) => {  return res.render("pages/login.ejs", { error: null });  },
      
       
        login: (req,res) => {
            const db_fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8")); // Leer archivo cada vez
            // en adminLogueado tengo los datos de la persona que se logueo con email y
            // contraseña, puede ser el administrador o un usuario, si es el administrador
            // va poder acceder a las paginas de edicion y creacion. En este caso si es un
            // usuario se queda en login y si no es ninguno, va al home
            //const adminLogueado = req.body;
            console.log (req.body);
                       
            const { email, password } = req.body;

            if (!email || !password) {
                return res.render("pages/login.ejs", { error: "Por favor, complete todos los campos." });
            }
    // ************************  administrador  ******************************
          if (email === process.env.ADMIN && password === process.env.PASSWORD) {
                req.session.admin = process.env.ADMIN; // Establecer la variable de sesión

                console.log(req.session.admin);
                res.render("pages/lista-fotos.ejs", { fotos : db_fotos })
              
           }
    
    //  *******************************  usuario  ******************************
            else  {
             
              // return res.render('pages/login.ejs');
               return res.render("pages/login.ejs", { error: "Credenciales incorrectas. Por favor, intente de nuevo." });
          };
        
    // *************************  ninguno ****************************
    
        }
}

module.exports = mainControllers;