var product = {};

function showestrellas(cantidad) {
let estrellas= "";
for (let i = 0; i < cantidad; i++) {
    estrellas+= `<span class="fa fa-star checked"></span>`
}
for (let i = 0; i < 5- cantidad ; i++) {
estrellas+= `<span class="fa fa-star"></span>`
} 

return estrellas;
};

function showComentarios(comentarios) {

    let htmlContentToAppend = "";

    for (let i = 0; i < comentarios.length; i ++) {
        let info = comentarios[i]; 
        htmlContentToAppend += `
            <div class="list-group-item">
                <div class="row">
                    <div class="col">
                         <p>Puntaje: ` + showestrellas(info.score) + ` </p>
                         <p>Opinion: ` + info.description + ` </p>
                         <p>Usuario: ` + info.user + ` </p>
                         <p>Fecha: ` + info.dateTime + ` </p>
                    </div>
                </div>
            </div>
            `              
    }
    document.getElementById("comentarios").innerHTML = htmlContentToAppend;
}


function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
        
        document.getElementById("imagenes").innerHTML = htmlContentToAppend;
    }
}
function showProductosRelacionados(productos, relacionados){
    let htmlContentToAppend = "";

    for (let i = 0; i < relacionados.length; i++){
        let productsrelacionados = productos[relacionados[i]];

        htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action col-3">
                <div>
                        <img src="` + productsrelacionados.imgSrc + `" alt="` + productsrelacionados.description + `" class="img-thumbnail">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + productsrelacionados.name + `</h4>
                        </div>
                        <p class="mb-1">` + productsrelacionados.description + `</p>
                    </div>
            </a>
            `
    }

    document.getElementById("relacionados").innerHTML = htmlContentToAppend;
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            console.log(resultObj.data);
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("soldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productCostHTML = document.getElementById("precio");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML =  product.category;
            productCostHTML.innerHTML = product.currency + ' ' + product.cost;

            getJSONData(PRODUCTS_URL).then(function(resultObj) {
                if (resultObj.status ==="ok") {
                    showProductosRelacionados(resultObj.data,product.relatedProducts)
                }
            })
            //Muestro las imagenes en forma de galeria
            showImagesGallery(product.images);
        }


    })
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            showComentarios(resultObj.data);
        }
    }
    
    )}
);
