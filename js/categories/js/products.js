//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//document.addEventListener("DOMContentLoaded", function (e) {});
const ORDER_ASC_BY_PRECIO = "Min-Max";
const ORDER_DESC_BY_PRECIO = "Max-Min";
const ORDER_BY_PROD_RELEVANCIA = "Relevancia";
var currentProductsOrden = undefined;
var minProducto = undefined;
var maxProducto = undefined;
var currentProductsArray = [];

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            console.log(resultObj.data);
            //sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
            sortProductosP(ORDER_ASC_BY_PRECIO,resultObj.data);
        }
        showProductsList();
    })
    //agrega al evento de ordenar por orden ascendente al precio
    document.getElementById("precioAsc").addEventListener("click", function(){
        sortProductosP(ORDER_ASC_BY_PRECIO);
    });
// oreden descendente
    document.getElementById("precioDesc").addEventListener("click", function(){
        sortProductosP(ORDER_DESC_BY_PRECIO);
    });
// VA A ORDENAR DE ORDEN DESCENDIENTE LA RELEVANCIA
    document.getElementById("relevancia").addEventListener("click", function(){
        sortProductosP(ORDER_BY_PROD_RELEVANCIA);
    });
//limpiar las casillas de precio
    document.getElementById("rangoFiltroLimpiar").addEventListener("click", function(){
        document.getElementById("rangoFiltroProductoMin").value = "";
        document.getElementById("rangoFiltroProductoMax").value = "";

        minProducto = undefined;
        maxProducto = undefined;

        showProductsList();
    });
// le asigna valor max y min que se ingresa en los cuadritos
    document.getElementById("rangoFiltroProducto").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minProducto = document.getElementById("rangoFiltroProductoMin").value;
        maxProducto = document.getElementById("rangoFiltroProductoMax").value;

        if ((minProducto != undefined) && (minProducto != "") && (parseInt(minProducto)) >= 0){
            minProducto = parseInt(minProducto);
        }
        else{
            minProducto = undefined;
        }

        if ((maxProducto != undefined) && (maxProducto != "") && (parseInt(maxProducto)) >= 0){
            maxProducto = parseInt(maxProducto);
        }
        else{
            maxProducto = undefined;
        }

        showProductsList();
    });

});

function sortProducto(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRECIO)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost){ return -1; }
            if ( a.cost > b.cost){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRECIO){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_RELEVANCIA){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function sortProductosP(sortCriteria, categoriesArray){
    currentProductsOrden = sortCriteria;

    if(categoriesArray != undefined){
        currentProductsArray = categoriesArray;
    }

    currentProductsArray = sortProducto(currentProductsOrden, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}
function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let products = currentProductsArray[i];

        if (((minProducto == undefined) || (minProducto != undefined && parseInt(products.cost) >= minProducto)) &&
            ((maxProducto == undefined) || (maxProducto != undefined && parseInt(products.cost) <= maxProducto))){

        htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + products.name + `</h4>
                            <small class="text-muted">` + products.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + products.description + `</p>
                        <p class="mb-1">` + products.currency +  products.cost + `</p>
                    </div>
                </div>
            </a>
            `
    }

    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;

}}