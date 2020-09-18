//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
/* function tellevoa() {
    location.href = "index.html"
}*/
var usuario = localStorage.getItem("inputEmail");
document.getElementById("boton").addEventListener("click", function(e){
    e.preventDefault();

    if (document.getElementById("inputEmail").value.length != 0 && document.getElementById("inputPassword").value.length !=0) {
   localStorage.setItem("inputEmail",  document.getElementById("inputEmail").value);
 document.getElementById("inputEmail").placeholder="ingrese correo";
        return location.href="Paginaprincipal.html";
    } else {
        placeholder= "ingrese correo";
}
});