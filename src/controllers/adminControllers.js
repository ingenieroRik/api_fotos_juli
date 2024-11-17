
const path = require("path");
const { json } = require("express");

const fs = require("fs");

const fotosFilePath = path.join(__dirname, "../data/db_fotos.json");
//const db_fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8")); si lo declaro aqui solamente no actualiza la lista cuando agrego


/* Requerimos propiedad validationResult para poder validar campos de form */
const {validationResult, body} = require('express-validator');

const adminControllers = {
   
    admin: (req,res) => res.render( 'create.ejs'),


    //verlista: (req,res) => res.render("pages/lista-fotos.ejs", { fotos : db_fotos }),

      verlista: (req, res) => {
        const db_fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8")); // Leer archivo cada vez
        res.render("pages/lista-fotos.ejs", { fotos: db_fotos });
       },

       
       edicionFoto: (req, res) => {
     
      const db_fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8"));
      const id = req.params.id;
      //console.log(req.params);
      console.log(id);
      const foto = db_fotos.find((prod) => {
        return prod.id == id;
      });
  
      res.render("./pages/edicionFoto.ejs", { foto: foto });
  
    },

      procesoEdicion: (req, res) => {
      const db_fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8"));

      const id = req.params.id;
      const fotoIndex = db_fotos.findIndex((foto) => foto.id == id);

      if (fotoIndex !== -1) {
          const foto = db_fotos[fotoIndex];
          foto.name = req.body.name || foto.name;
          foto.artist = req.body.artist || foto.artist;
          foto.band = req.body.band || foto.band;
          foto.venue = req.body.venue || foto.venue;
          foto.year = req.body.year || foto.year;

          if (req.file) {
              foto.img = req.file.filename;
          }

          fs.writeFileSync(fotosFilePath, JSON.stringify(db_fotos, null, 2));
          res.redirect("/verlista");
      } else {
          res.status(404).send("Foto no encontrada");
      }
    },



    procesoEdicion2: (req, res) => {
      const db_fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8"));
  
      let id = req.params.id;
      let fotoAnterior = db_fotos.find((foto) => {
        return foto.id == id;
      });
  
      let fotoEditada = {
        id: fotoAnterior.id,
        name: req.body.name,
        img: req.file ? req.file.filename : fotoAnterior.img,
        artist: req.body.artist,
        band: req.body.band,
        venue: req.body.venue,
        year: req.body.year,
      };
  
      /* "PUSHEANDO" El archivo editado */
  
      let indice = db_fotos.findIndex((product) => {
        return product.id == id;
      });
  
      db_fotos[indice] = fotoEditada;
  
      /* Sobreescribir el archivo JSON */
      fs.writeFileSync(fotosFilePath, JSON.stringify(fotos, null, " "));
      res.redirect("/login");
    },
  



    delete: (req, res) => {
      let id = req.params.id;
      const fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8"));
  
      let fotosFiltradas = fotos.filter((foto) => {
        return foto.id != id;
      });
  
      fs.writeFileSync(
        fotosFilePath,
        JSON.stringify(fotosFiltradas, null, " ")
      );
      res.render("pages/lista-fotos.ejs", { fotos : fotosFiltradas });
    },
  


    creacionFoto: (req, res) => {
      return res.render("pages/creacionFoto.ejs");
    },



    procesoCreacion: (req, res) => {
      const db_fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8")); // Leer archivo cada vez
      const fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8"));
      let errors = validationResult(req);
      if(errors.isEmpty()) {
          let newId = fotos.length > 0 ? fotos[fotos.length - 1].id + 1 : 1; // Obtener el último ID y sumarle 1
          let fotoNueva = {
              id: newId,
              name: req.body.name,
              img: req.file ? req.file.filename : "Carga tu foto",
              artist: req.body.artist,
              band: req.body.band,
              venue: req.body.venue,
              year: req.body.year,
          };
          // Agregar la nueva foto al array de fotos
          db_fotos.push(fotoNueva);
          // Sobreescribir el archivo JSON con la nueva foto
          fs.writeFileSync(fotosFilePath, JSON.stringify(db_fotos, null, " "));
          res.render("pages/lista-fotos.ejs", { fotos: db_fotos });
          
      } else {
          return res.render("pages/creacionFoto.ejs", {
              errors: errors.array(),
              old: req.body
          });
      }
  },



    procesoCreacion2: (req, res) => {
      const fotos = JSON.parse(fs.readFileSync(fotosFilePath, "utf-8"));
      let errors = validationResult(req);
  
      if(errors.isEmpty()){
      let fotoNueva = {
        id: fotos[fotos.length - 1].id + 1,
        name: req.body.name,
        imagenUsuario: req.file ? req.file.filename : "Carga tu foto",
        artist: req.body.artist,
        band: req.body.band,
        venue: req.body.venue,
        year: req.body.year,
      };
  
      /* PUSHEANDO El archivo editado */
      db_fotos.push(fotoNueva);
  
      /* Sobreescribir el archivo JSON */
      fs.writeFileSync(fotosFilePath, JSON.stringify(fotos, null, " "));

      res.render("pages/lista-fotos.ejs", { fotos : db_fotos });
      //res.redirect("/login");
      }else {
        return res.render("./fotos/creacionProduct", 
        {errors: errors.array(),
        old: req.body })
      }
    },




}

module.exports = adminControllers;