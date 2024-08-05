function agregarAlCarrito(producto){
    const MEMORIA = JSON.parse(localStorage.getItem("modulo") || []);
    console.log(MEMORIA);
    let cuenta = 0;
    if(!MEMORIA){
        const NUEVO_PRODUCTO = getNuevoProductoParaMemoria(producto);
        NUEVO_PRODUCTO.cantidad = 1;
        localStorage.setItem("modulo",JSON.stringify([NUEVO_PRODUCTO]));
        cuenta = 1;
    } else{
        const INDICE_PRODUCTO = MEMORIA.findIndex(modulo => modulo.id === producto.id);
        console.log(INDICE_PRODUCTO);
        const NUEVA_MEMORIA = MEMORIA;
        if(INDICE_PRODUCTO === -1){
            NUEVA_MEMORIA.push(getNuevoProductoParaMemoria(producto));
            cuenta = 1;
        }else {
            NUEVA_MEMORIA[INDICE_PRODUCTO].cantidad ++;
            cuenta = NUEVA_MEMORIA[INDICE_PRODUCTO].cantidad; 
        }
        localStorage.setItem("modulo",JSON.stringify(NUEVA_MEMORIA));
    }   
    actualizarNumeroCarrito();
    return cuenta;
}

function restarAlCarrito(producto){
    const MEMORIA = JSON.parse(localStorage.getItem("modulo"));
    const INDICE_PRODUCTO = MEMORIA.findIndex(modulo => modulo.id === producto.id);
    if(MEMORIA [INDICE_PRODUCTO].cantidad === 1){
        MEMORIA.splice(INDICE_PRODUCTO,1);
    }else{
        MEMORIA[INDICE_PRODUCTO].cantidad--;
    }
    localStorage.setItem("modulo",JSON.stringify(MEMORIA));
    actualizarNumeroCarrito();
}

function getNuevoProductoParaMemoria(producto){
    const NUEVO_PRODUCTO = producto;
    NUEVO_PRODUCTO.cantidad = 1;
    return NUEVO_PRODUCTO;
}

const CUENTA_CARRITO_ELEMENT = document.getElementById("cuentaCarrito");
function actualizarNumeroCarrito(){
    const MEMORIA = JSON.parse(localStorage.getItem("modulo"));
    if(MEMORIA && MEMORIA.length > 0){
    const CUENTA = MEMORIA.reduce((acum, current)=> acum + current.cantidad,0);
    CUENTA_CARRITO_ELEMENT.innerText = CUENTA;
    console.log(CUENTA);
    }else{
        CUENTA_CARRITO_ELEMENT.innerText = 0;
    }
}

actualizarNumeroCarrito();
