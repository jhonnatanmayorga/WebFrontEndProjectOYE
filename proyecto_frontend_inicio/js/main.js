function validar(){
    if(formRegistrar.nombre.value.trim().length == 0){
        alert("Nombre es obligatorio");
        return false;
    }
    if(formRegistrar.apellido.value.trim().length == 0){
        alert("Apellido es obligatorio");
        return false;
    }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(formRegistrar.email.value)){
        alert("Email invalido");
        return false;
    }
    if(formRegistrar.password.value.trim().length == 0){
        alert("Contaseña es obligatorio");
        return false;
    } 
    if(formRegistrar.password.value.trim().length < 8){
        alert("Contaseña debe tener más de 8 caracteres");
        return false;
    }
    if(formRegistrar.password.value != formRegistrar.confirmacion.value){
        alert("Confirmacion no coincide");
        return false;
    }
    if(formRegistrar.telefono.value.trim().length == 0){
        alert("telefono es obligatorio");
        return false;
    }
    if(formRegistrar.pais.value == ""){
        alert("Pais es obligatorio");
        return false;
    }
    if(!formRegistrar.terminos.checked){
        alert("Debe aceptar los terminos y condiciones");
        return false;
    }

    return true;
    }
    function validarLogin(){

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 
        if(!re.test(formInicioSesion.email.value)){
            alert("Email invalido");
            return false;
        }
        if(formInicioSesion.password.value.trim().length == 0){
            alert("Contaseña es obligatorio");
            return false;
        } 
        if(formInicioSesion.password.value.trim().length < 8){
            alert("Contaseña debe tener más de 8 caracteres");
            return false;
        }

        return true;
        }