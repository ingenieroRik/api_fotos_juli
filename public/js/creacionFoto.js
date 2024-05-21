window.onload = function () {

    let name = document.querySelector("#name")
    let artist = document.querySelector("#artist")
    let band = document.querySelector("#band")
    let color = document.querySelector("#color")
    let venue = document.querySelector("#venue")
    let year = document.querySelector("#year")
    let imagen = document.querySelector("#imgFoto")
   

    name.focus()

    btnCargar.addEventListener("click", function (e) {

        let errors = {}

        if (name.value.length < 2) {
            errors.name = "Debes completar con un name valido"
        }

        if (artist.value.length < 6) {
            errors.artist = "Debes completar con una artist valida"
        }

        if (band.value.length < 1) {
            errors.band = "Debes completar con un band valido"
        }

        if (color.value.length <= 5) {
            errors.color = "Debes completar con un color valido"
        }

        if (venue.value.length < 4) {
            errors.venue = "Debes completar con un venue valido"
        }

        if (year.value.length < 1) {
            errors.year = "Debes completar con un year valido"
        }

        if (imagen.value.length < 4) {
            errors.img = "Debes completar con un imagen valida"
        }

      

        
    })

     //BOTON VOLVER PAGINA ANTERIOR

    let btnVolver = document.querySelector("#btnVolver")

    btnVolver.addEventListener("click", function(e){
        history.go(-1)
    })


}
