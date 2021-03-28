// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos'); // Contexto productos(pizza)
let articulosCarrito = []; 

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un producto presionando "Agregar al Carrito"
    listaProductos.addEventListener('click', agregarProducto);

    // Elimina productos del carrito
    carrito.addEventListener('click', eliminarProducto);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [] // resetea el arreglo

        limpiarHTML(); // Eliminamos todo el HTML del carrito
    })
}

// Funciones
function agregarProducto(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(e.target.parentElement.parentElement);
    }
}

// Elimina productos del carrito
function eliminarProducto(e) {
    if(e.target.classList.contains('borrar-producto')) {
        const productoId = e.target.getAttribute('data-id');

        // Eliminar del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( producto => producto.id !== productoId); // Que se traiga todos los productos, excepto el a eliminar por id

        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}

// Lee el contenido del HTMl al que le dimos click y extrae la información del producto
function leerDatosProducto(producto) {

    // Crea un objeto con el contenido del producto
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( producto => producto.id === infoProducto.id ); // Itera por cada Id de productos que estan en el carrito
    if(existe) {
        // Actualizar la cantidad
        const producto = articulosCarrito.map( producto => {
            if(producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto; // Retorna el objeto actualizado
            } else {
                return producto; // Retorna los objetos que no son los duplicados
            }
        } );
        articulosCarrito = [...producto]
    } else {
        // Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoProducto];
    }

    

    console.log(articulosCarrito);

    carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
    // Limpiar el HTML
    limpiarHTML()

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( producto => {
        const {imagen, titulo, precio, cantidad, id} = producto; // Destructuring del Obj Producto
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-producto" data-id="${id}"> X </a>
            </td>
        `;

        // Agrega el HTMl del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los productos del tbody
function limpiarHTML() {
    // Forma lenta
    //contenedorCarrito.innerHTML = ''; // Se limpia el HTML con un str vacio.

    while(contenedorCarrito.firstChild) { // Mientras el contenedor tenga un hijo se cumple la condicion
        contenedorCarrito.removeChild(contenedorCarrito.firstChild); // Elimina un hijo por el primero 
    } // El while itera hasta que no quede ningun hijo 
}