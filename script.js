// LISTA DE PRODUCTOS CON CATEGORÍAS
const productos = [
    { id: 1, nombre: "Audífonos Bluetooth", precio: 45.00, categoria: "tecnologia" },
    { id: 2, nombre: "Camiseta de Algodón", precio: 20.00, categoria: "ropa" },
    { id: 3, nombre: "Reloj Inteligente", precio: 89.99, categoria: "tecnologia" },
    { id: 4, nombre: "Mochila Urbana", precio: 35.50, categoria: "accesorios" },
    { id: 5, nombre: "Gafas de Sol", precio: 15.00, categoria: "accesorios" },
    { id: 6, nombre: "Zapatillas Deportivas", precio: 65.00, categoria: "ropa" }
];

// ESTADO DE LA APLICACIÓN (Carga inicial desde localStorage)
let carrito = JSON.parse(localStorage.getItem('carrito_tienda')) || [];
let categoriaActual = 'todos';
let filtroBusqueda = '';

// ELEMENTOS DEL DOM
const productsGrid = document.getElementById('products-grid');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const inputBusqueda = document.getElementById('input-busqueda');
const filterBtns = document.querySelectorAll('.btn-filter');
const btnVaciar = document.getElementById('btn-vaciar');
const btnComprar = document.getElementById('btn-comprar');
const toast = document.getElementById('toast');

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarCarrito();
    setupEventListeners();
});

// MANEJADORES DE EVENTOS
function setupEventListeners() {
    // Evento de búsqueda en tiempo real
    inputBusqueda.addEventListener('input', (e) => {
        filtroBusqueda = e.target.value.toLowerCase();
        renderizarProductos();
    });

    // Evento de filtro por categoría
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            categoriaActual = btn.dataset.category;
            renderizarProductos();
        });
    });

    // Vaciar Carrito
    btnVaciar.addEventListener('click', () => {
        guardarYActualizar();
        mostrarToast("Carrito vaciado correctamente");
    });

    // Finalizar Compra
    btnComprar.addEventListener('click', () => {
        if (carrito.length === 0) {
            mostrarToast("El carrito está vacío");
            return;
        }
        alert("¡Gracias por tu compra!");
        carrito = [];
        guardarYActualizar();
    });
}

// RENDERIZAR GRILLA DE PRODUCTOS
function renderizarProductos() {
    productsGrid.innerHTML = '';

    const productosFiltrados = productos.filter(p => {
        const coincideCategoria = categoriaActual === 'todos' || p.categoria === categoriaActual;
        const coincideNombre = p.nombre.toLowerCase().includes(filtroBusqueda);
        return coincideCategoria && coincideNombre;
    });

    if (productosFiltrados.length === 0) {
        productsGrid.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    productosFiltrados.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${prod.nombre}</h3>
            <p class="price">$${prod.precio.toFixed(2)}</p>
            <button class="btn-primary" onclick="agregarAlCarrito(${prod.id})">Añadir al Carrito</button>
        `;
        productsGrid.appendChild(card);
    });
}

// FUNCIONALIDADES DEL CARRITO
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    if (producto) {
        carrito.push(producto);
        guardarYActualizar();
        mostrarToast(`"${producto.categoria}" añadido al carrito`);
    }
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarYActualizar();
    mostrarToast("Producto eliminado");
}

function guardarYActualizar() {
    localStorage.setItem('carrito_tienda', JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    cartItems.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        cartItems.innerHTML = '<li>El carrito está vacío</li>';
    } else {
        carrito.forEach((item, index) => {
            total += item.id;
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.nombre} - $${item.id.toFixed(2)}</span>
                <button class="btn-secondary" onclick="eliminarDelCarrito(${index})">X</button>
            `;
            cartItems.appendChild(li);
        });
    }

    cartCount.textContent = carrito.length;
    cartTotal.textContent = total.toFixed(2);
}

// NOTIFICACIÓN TOAST
function mostrarToast(mensaje) {
    toast.textContent = mensaje;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 2500);
}