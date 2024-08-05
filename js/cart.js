const CONTENEDOR_TARJETAS = document.getElementById("productos-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");
const reiniciarCarritoElement = document.getElementById("reiniciar");

function crearProductoTarjetaInicio() {
    CONTENEDOR_TARJETAS.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("modulo"));
    console.log(productos)
    if (productos && productos.length > 0) {
        productos.forEach(producto => {
            const NUEVO_MODULO = document.createElement("div");
            NUEVO_MODULO.classList = "tarjeta-producto";
            NUEVO_MODULO.innerHTML = `
            <img src= ./img/${producto.id}.jpg>
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <div>
                <button>-</button>
                <span class="cantidad">${producto.cantidad}</span>
                <button>+</button>
            </div>
        `
            CONTENEDOR_TARJETAS.appendChild(NUEVO_MODULO);
            NUEVO_MODULO
            .getElementsByTagName("button")[1]
            .addEventListener("click", (e) => {
                const CUENTA_ELEMENT = e.target.parentElement.getElementsByTagName("span")[0];
                CUENTA_ELEMENT.innerText = agregarAlCarrito(producto);
                actualizarTotales();
            });
            NUEVO_MODULO
            .getElementsByTagName("button")[0]
            .addEventListener("click", (e) => {
                restarAlCarrito(producto);
                crearProductoTarjetaInicio();
                actualizarTotales();
            })
        });
    }
}

crearProductoTarjetaInicio();
actualizarTotales();

function actualizarTotales(){
    const productos = JSON.parse(localStorage.getItem("modulo"));
    let unidades = 0;
    let precio = 0;
    if (productos && productos.length > 0){
        productos.forEach(producto =>{
        unidades += producto.cantidad;
        precio += producto.precio * producto.cantidad;
        })
        unidadesElement.innerText = unidades;
        precioElement.innerText = precio;
    }
}

function revisarMensajeVacio(){
    const productos = JSON.parse(localStorage.getItem("modulo"));
    carritoVacioElement.classList.toggle("escondido", (productos && productos.length > 0));
    totalesElement.classList.toggle("escondido",!(productos && productos.length > 0));
}

revisarMensajeVacio();

reiniciarCarritoElement.addEventListener("click", reiniciarCarrito);

function reiniciarCarrito(){
    localStorage.removeItem("modulos");
    actualizarTotales();
    crearProductoTarjetaInicio();
    revisarMensajeVacio();
}
