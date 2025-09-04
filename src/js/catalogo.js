// Funcionalidad del catálogo
let productosActuales = [];
let productosFiltrados = [];
let paginaActual = 1;
const productosPorPagina = 9;

document.addEventListener('DOMContentLoaded', () => {
    cargarCategorias();
    cargarProductos();
    configurarFiltros();
    actualizarContadorCarrito();
});

function cargarCategorias() {
    const categoriesGrid = document.getElementById('categories-grid');
    if (!categoriesGrid) return;

    categoriesGrid.innerHTML = '';
    
    categorias.forEach(categoria => {
        const categoryCard = document.createElement('article');
        categoryCard.className = 'category-card';
        categoryCard.innerHTML = `
            <h3>${categoria.nombre}</h3>
            <p>${categoria.descripcion}</p>
            <a href="#" onclick="filtrarPorCategoria('${categoria.id}')">Ver Productos</a>
        `;
        categoriesGrid.appendChild(categoryCard);
    });
}

function cargarProductos() {
    productosActuales = obtenerTodosLosProductos();
    productosFiltrados = [...productosActuales];
    mostrarProductos();
    actualizarContadorProductos();
}

function mostrarProductos() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    // Calcular productos para la página actual
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosParaMostrar = productosFiltrados.slice(inicio, fin);

    if (productosParaMostrar.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <h3>No se encontraron productos</h3>
                <p>Intenta ajustar los filtros de búsqueda.</p>
            </div>
        `;
        return;
    }

    productosParaMostrar.forEach(producto => {
        const productCard = document.createElement('article');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" onerror="this.src='src/images/placeholder.jpg'">
            <h3>${producto.nombre}</h3>
            <div class="product-rating">
                <span class="stars">${generarEstrellas(producto.rating)}</span>
                <span class="rating-text">${producto.rating} (${producto.reviews} reseñas)</span>
            </div>
            <p class="price">${formatearPrecio(producto.precio)}</p>
            <div class="product-stock">
                <span class="stock-info ${producto.stock < 5 ? 'low-stock' : ''}">${producto.stock > 0 ? `Stock: ${producto.stock}` : 'Sin stock'}</span>
            </div>
            <div class="product-actions">
                <button class="add-to-cart" data-product-id="${producto.id}" ${producto.stock === 0 ? 'disabled' : ''}>
                    ${producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
                </button>
                <a href="producto.html?id=${producto.id}" class="view-details">Ver Detalles</a>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Agregar event listeners a los botones de agregar al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-product-id');
            agregarAlCarrito(productId);
        });
    });

    mostrarPaginacion();
}

function configurarFiltros() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    if (categoryFilter) {
        categoryFilter.addEventListener('change', aplicarFiltros);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', aplicarFiltros);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', aplicarFiltros);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', aplicarFiltros);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                aplicarFiltros();
            }
        });
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', aplicarFiltros);
    }
}

function aplicarFiltros() {
    const categoria = document.getElementById('category-filter')?.value || '';
    const precioMax = document.getElementById('price-filter')?.value || '';
    const ordenamiento = document.getElementById('sort-filter')?.value || 'nombre';
    const busqueda = document.getElementById('search-input')?.value || '';

    // Empezar con todos los productos
    let productos = obtenerTodosLosProductos();

    // Filtrar por categoría
    if (categoria) {
        productos = productos.filter(producto => producto.categoria === categoria);
    }

    // Filtrar por precio máximo
    if (precioMax) {
        productos = productos.filter(producto => producto.precio <= parseInt(precioMax));
    }

    // Filtrar por búsqueda
    if (busqueda) {
        const terminoBusqueda = busqueda.toLowerCase();
        productos = productos.filter(producto => 
            producto.nombre.toLowerCase().includes(terminoBusqueda) ||
            producto.descripcion.toLowerCase().includes(terminoBusqueda)
        );
    }

    // Ordenar productos
    productos = ordenarProductos(productos, ordenamiento);

    productosFiltrados = productos;
    paginaActual = 1; // Resetear a la primera página
    mostrarProductos();
    actualizarContadorProductos();
}

function ordenarProductos(productos, criterio) {
    switch (criterio) {
        case 'precio-asc':
            return productos.sort((a, b) => a.precio - b.precio);
        case 'precio-desc':
            return productos.sort((a, b) => b.precio - a.precio);
        case 'rating':
            return productos.sort((a, b) => b.rating - a.rating);
        case 'nombre':
        default:
            return productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
}

function filtrarPorCategoria(categoria) {
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.value = categoria;
        aplicarFiltros();
    }
    
    // Scroll a la sección de productos
    const productsSection = document.querySelector('.catalog-products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function mostrarPaginacion() {
    const paginationControls = document.getElementById('pagination-controls');
    if (!paginationControls) return;

    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    
    if (totalPaginas <= 1) {
        paginationControls.innerHTML = '';
        return;
    }

    let html = '<div class="pagination-buttons">';
    
    // Botón anterior
    if (paginaActual > 1) {
        html += `<button onclick="cambiarPagina(${paginaActual - 1})" class="pagination-btn">« Anterior</button>`;
    }
    
    // Números de página
    for (let i = 1; i <= totalPaginas; i++) {
        if (i === paginaActual) {
            html += `<button class="pagination-btn active">${i}</button>`;
        } else {
            html += `<button onclick="cambiarPagina(${i})" class="pagination-btn">${i}</button>`;
        }
    }
    
    // Botón siguiente
    if (paginaActual < totalPaginas) {
        html += `<button onclick="cambiarPagina(${paginaActual + 1})" class="pagination-btn">Siguiente »</button>`;
    }
    
    html += '</div>';
    paginationControls.innerHTML = html;
}

function cambiarPagina(nuevaPagina) {
    paginaActual = nuevaPagina;
    mostrarProductos();
    
    // Scroll al inicio de los productos
    const productsSection = document.querySelector('.catalog-products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function actualizarContadorProductos() {
    const productsCount = document.getElementById('products-count');
    if (productsCount) {
        const total = productosFiltrados.length;
        const inicio = (paginaActual - 1) * productosPorPagina + 1;
        const fin = Math.min(inicio + productosPorPagina - 1, total);
        
        if (total === 0) {
            productsCount.textContent = 'No se encontraron productos';
        } else {
            productsCount.textContent = `Mostrando ${inicio}-${fin} de ${total} productos`;
        }
    }
}

function agregarAlCarrito(productId) {
    const producto = obtenerProductoPorId(productId);
    if (!producto) return;

    // Obtener carrito actual del localStorage
    let carrito = JSON.parse(localStorage.getItem('levelUpGamerCart')) || [];
    
    // Verificar si el producto ya está en el carrito
    const itemExistente = carrito.find(item => item.id === productId);
    
    if (itemExistente) {
        // Verificar stock disponible
        if (itemExistente.cantidad < producto.stock) {
            itemExistente.cantidad += 1;
            mostrarMensaje(`Se agregó otra unidad de ${producto.nombre} al carrito`, 'success');
        } else {
            mostrarMensaje(`No hay más stock disponible de ${producto.nombre}`, 'error');
            return;
        }
    } else {
        // Agregar nuevo producto al carrito
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
        mostrarMensaje(`${producto.nombre} agregado al carrito`, 'success');
    }
    
    // Guardar carrito actualizado
    localStorage.setItem('levelUpGamerCart', JSON.stringify(carrito));
    
    // Actualizar contador del carrito
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const carrito = JSON.parse(localStorage.getItem('levelUpGamerCart')) || [];
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        cartCount.textContent = `(${totalItems})`;
    }
}

function mostrarMensaje(mensaje, tipo) {
    // Crear elemento de mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${tipo}`;
    messageDiv.textContent = mensaje;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#39FF14' : '#FF4444'};
        color: #000000;
        padding: 1rem 2rem;
        border-radius: 5px;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remover mensaje después de 3 segundos
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

