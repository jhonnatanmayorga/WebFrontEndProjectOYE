function validar(){
    if(formRegistrar.nombre.value.trim().length == 0){
        alerta("Nombre es obligatorio");
        return false;
    }
    if(formRegistrar.apellido.value.trim().length == 0){
        alerta("Apellido es obligatorio");
        return false;
    }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(formRegistrar.email.value)){
        alerta("Email invalido");
        return false;
    }
    if(formRegistrar.password.value.trim().length == 0){
        alerta("Contaseña es obligatorio");
        return false;
    } 
    if(formRegistrar.password.value.trim().length < 8){
        alerta("Contaseña debe tener más de 8 caracteres");
        return false;
    }
    if(formRegistrar.password.value != formRegistrar.confirmacion.value){
        alerta("Confirmacion no coincide");
        return false;
    }
    if(formRegistrar.telefono.value.trim().length == 0){
        alerta("telefono es obligatorio");
        return false;
    }
    if(formRegistrar.pais.value == ""){
        alerta("Pais es obligatorio");
        return false;
    }
    if(!formRegistrar.gridRadios.checked ){
      alerta("Debe seleccionar un rango de edad");
      return false;
  }
    if(!formRegistrar.terminos.checked){
        alerta("Debe aceptar los terminos y condiciones");
        return false;
    }

    return true;
}


    
    function validarLogin(){

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 
        if(!re.test(formInicioSesion.email.value)){
            alerta("Email invalido");
            return false;
        }
        if(formInicioSesion.password.value.trim().length == 0){
            alerta("Contaseña es obligatorio");
            return false;
        } 
        if(formInicioSesion.password.value.trim().length < 8){
            alerta("Contaseña debe tener más de 8 caracteres");
            return false;
        }

        return true;
    }

    function alerta(mensaje){
      var html = ""
      html += `
    
      <div class="alert alert-danger" role="alert" id="alertas">                
      ${mensaje}
      <button
      type="button"
      class="close"
      data-dismiss="alert"
      aria-label="Close"
      >
      <span aria-hidden="true">&times;</span>
      </button>
      </div>
                    `
          
                //Modifica el DOM agregando el html generado
       document.getElementById("alertas").innerHTML = html;
       return ;
    }
/// Funcion que carga las canciones
function cargarCanciones(sitio){
  var canciones = [];
  var html = ""
  $(document).ready(function () {
  
    //Carga los datos que estan en el JSON (datos.json) usando AJAX
    $.ajax({
      url: "datos.json"
    }).done(function (resultado) {
      console.log(resultado);
      console.log(sitio);

//var canciones;

    //Si la longitud de buscar es mayor a 0 filtra canciones 
if (sitio != 'home' ){
  var cajaBuscar =  formBuscarCancion.buscar.value.trim();
  if(cajaBuscar.length > 0){
    canciones = resultado.canciones;
    canciones = filterItems(canciones, cajaBuscar);
    console.log("Despues del filter");
  }
  else{
    canciones = resultado.canciones;
  }
  html = dibujarCanciones(canciones);

}
if (sitio == 'home'){
  var cancionesTop = [];
  //Ordena segun mayor en reproducciones 
  canciones = resultado.canciones;
  console.log(canciones);
  canciones = canciones.sort(function(x,y){
    if (x.reproducciones < y.reproducciones){
      return 1;
    }
    return -1;
  });
  
  canciones =resultado.canciones;
  for (var j = 0; j < 3; j++){
    cancionesTop.push(canciones[j]);
  }
  console.log(cancionesTop);
  html = dibujarCancionestop(cancionesTop);
  

}  
    //Modifica el DOM agregando el html generado
    document.getElementById("canciones").innerHTML = html

    })
  });



}

function dibujarCanciones(canciones){
    //Crea un string que contenga el HTML que describe el detalle del evento
    var html = ""

    //Recorre el arreglo y concatena el HTML para cada Cancion
    for(var j = 0; j < canciones.length; j++){
      html += `
                <div class="col-lg-4 col-md-6">
                    <div class="col border">
                        <div class="row" id="imagenCancion">
                        <img src="imagenes/icon_${canciones[j].icono}.svg" class="card-img-top" alt="..." style="max-width: 20%;">
                        </div>
                        <div class="row bg-white"><h3>${canciones[j].nombre}</h3></div>
                        <div class="row bg-white">
                        <audio class="play" src="canciones/${canciones[j].ruta}" controls preload="none" style="max-width: 80%;"></audio>
                        </div>
                    </div>
                </div>
              `
    }

    return html;

}

/// Funcion encargada de filtrar canciones
function filterItems(canciones, query){
  var cancion = canciones;
  console.log(cancion);
  return cancion.filter(e => {
    return e.nombre.toLowerCase().indexOf(query.toLowerCase()) > -1;
  });
}

function dibujarCancionestop(canciones){
      //Crea un string que contenga el HTML que describe el detalle del evento
      var html = ""

      //Recorre el arreglo y concatena el HTML para cada Cancion
      for(var j = 0; j < canciones.length; j++){
        html += `

              <div class="col d-none col-md-3 d-md-block text-left" id="topCancion">
                ${canciones[j].nombre}
              </div>
              <div class="col-12 col-md-9 text-center">
              <audio class="play" src="canciones/${canciones[j].ruta}" controls preload="none" style="max-width: 80%;"></audio>
              </div>

                `
      }
  
      //Modifica el DOM agregando el html generado
      return html;
  



}
function llamarJson(){

  $(document).ready(function () {
  
    //Carga los datos que estan en el JSON (datos.json) usando AJAX
    $.ajax({
      url: "datos.json"
    }).done(function (resultado) {
      console.log(resultado);

      return resultado.canciones;
    })
  });


}
