const CONTENEDOR_TARJETAS = document.getElementById("productos-container");
function crearProductoTarjetaInicio(productos){
    productos.forEach(producto => {
        const NUEVO_MODULO = document.createElement("div");
        NUEVO_MODULO.classList = "tarjeta-producto";
        NUEVO_MODULO.innerHTML = `
            <img src= ./img/${producto.id}.jpg>
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button>Agregar al carrito</button>
        `
        CONTENEDOR_TARJETAS.appendChild(NUEVO_MODULO);
        NUEVO_MODULO.getElementsByTagName("button")[0].addEventListener("click", ()=> agregarAlCarrito(producto))
    });
}

crearProductoTarjetaInicio(MODULOS);