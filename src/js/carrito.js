let carrito = [];
let descuentoDuoc = false;
let codigoPromoAplicado = null;

document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();
    mostrarCarrito();
    cargarProductosRecomendados();
    configurarEventListeners();
    verificarUsuarioDuoc();
    actualizarContadorCarrito();
});

function cargarCarrito() {
    carrito = JSON.parse(localStorage.getItem('levelUpGamerCart')) || [];
}

function guardarCarrito() {
    localStorage.setItem('levelUpGamerCart', JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function mostrarCarrito() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (!cartItemsContainer) return;

    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCartMessage.classList.remove('hidden');
        checkoutBtn.disabled = true;
        actualizarResumen();
        return;
    }

    emptyCartMessage.classList.add('hidden');
    checkoutBtn.disabled = false;

    cartItemsContainer.innerHTML = '';

    carrito.forEach((item, index) => {
        const producto = obtenerProductoPorId(item.id);
        if (!producto) return;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" onerror="this.src='src/images/placeholder.jpg'">
            <div class="cart-item-info">
                <h4>${item.nombre}</h4>
                <p class="item-price">${formatearPrecio(item.precio)}</p>
                <p class="item-stock">Stock disponible: ${producto.stock}</p>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-control">
                    <button onclick="cambiarCantidad(${index}, -1)" ${item.cantidad <= 1 ? 'disabled' : ''}>-</button>
                    <span class="quantity">${item.cantidad}</span>
                    <button onclick="cambiarCantidad(${index}, 1)" ${item.cantidad >= producto.stock ? 'disabled' : ''}>+</button>
                </div>
                <div class="item-total">
                    <span>${formatearPrecio(item.precio * item.cantidad)}</span>
                </div>
                <button onclick="eliminarDelCarrito(${index})" class="remove-item">
                    🗑️ Eliminar
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    actualizarResumen();
}

function cambiarCantidad(index, cambio) {
    const item = carrito[index];
    const producto = obtenerProductoPorId(item.id);
    
    if (!producto) return;

    const nuevaCantidad = item.cantidad + cambio;

    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(index);
        return;
    }

    if (nuevaCantidad > producto.stock) {
        mostrarMensaje(`Solo hay ${producto.stock} unidades disponibles de ${item.nombre}`, 'error');
        return;
    }

    carrito[index].cantidad = nuevaCantidad;
    guardarCarrito();
    mostrarCarrito();
}

function eliminarDelCarrito(index) {
    const item = carrito[index];
    
    if (confirm(`¿Estás seguro de que quieres eliminar ${item.nombre} del carrito?`)) {
        carrito.splice(index, 1);
        guardarCarrito();
        mostrarCarrito();
        mostrarMensaje(`${item.nombre} eliminado del carrito`, 'success');
    }
}

function vaciarCarrito() {
    if (carrito.length === 0) {
        mostrarMensaje('El carrito ya está vacío', 'info');
        return;
    }

    if (confirm('¿Estás seguro de que quieres vaciar todo el carrito?')) {
        carrito = [];
        guardarCarrito();
        mostrarCarrito();
        mostrarMensaje('Carrito vaciado', 'success');
    }
}

function actualizarResumen() {
    const subtotal = calcularSubtotal();
    const descuento = calcularDescuento(subtotal);
    const total = subtotal - descuento;

    document.getElementById('cart-subtotal').textContent = formatearPrecio(subtotal);
    document.getElementById('cart-total').textContent = formatearPrecio(total);

    // Mostrar/ocultar línea de descuento
    const discountLine = document.getElementById('discount-line');
    if (descuento > 0) {
        discountLine.style.display = 'flex';
        document.getElementById('cart-discount').textContent = `-${formatearPrecio(descuento)}`;
    } else {
        discountLine.style.display = 'none';
    }

    // Actualizar información de envío
    const shippingCost = document.getElementById('shipping-cost');
    if (subtotal >= 50000) {
        shippingCost.textContent = 'Gratis';
        shippingCost.style.color = '#39FF14';
    } else {
        const costoEnvio = 5000;
        shippingCost.textContent = formatearPrecio(costoEnvio);
        shippingCost.style.color = '#FFFFFF';
        document.getElementById('cart-total').textContent = formatearPrecio(total + costoEnvio);
    }
}

function calcularSubtotal() {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

function calcularDescuento(subtotal) {
    let descuento = 0;

    // Descuento Duoc (20%)
    if (descuentoDuoc) {
        descuento += subtotal * 0.20;
    }

    // Descuentos por códigos promocionales
    if (codigoPromoAplicado) {
        switch (codigoPromoAplicado) {
            case 'LEVELUP10':
                descuento += subtotal * 0.10;
                break;
            case 'GAMER15':
                descuento += subtotal * 0.15;
                break;
            case 'NEWBIE5':
                descuento += subtotal * 0.05;
                break;
        }
    }

    return descuento;
}

function verificarUsuarioDuoc() {
    const userData = JSON.parse(localStorage.getItem('levelUpGamerUser')) || 
                    JSON.parse(sessionStorage.getItem('levelUpGamerUser'));
    
    if (userData && userData.isDuocStudent) {
        descuentoDuoc = true;
        document.getElementById('duoc-discount-info').classList.remove('hidden');
    }
}

function aplicarCodigoPromo() {
    const promoInput = document.getElementById('promo-code');
    const promoMessage = document.getElementById('promo-message');
    const codigo = promoInput.value.trim().toUpperCase();

    if (!codigo) {
        mostrarMensajePromo('Por favor, ingresa un código promocional', 'error');
        return;
    }

    const codigosValidos = {
        'LEVELUP10': { descuento: 10, descripcion: '10% de descuento' },
        'GAMER15': { descuento: 15, descripcion: '15% de descuento' },
        'NEWBIE5': { descuento: 5, descripcion: '5% de descuento para nuevos usuarios' }
    };

    if (codigosValidos[codigo]) {
        if (codigoPromoAplicado === codigo) {
            mostrarMensajePromo('Este código ya está aplicado', 'info');
            return;
        }

        codigoPromoAplicado = codigo;
        const info = codigosValidos[codigo];
        mostrarMensajePromo(`¡Código aplicado! ${info.descripcion}`, 'success');
        promoInput.value = '';
        actualizarResumen();
    } else {
        mostrarMensajePromo('Código promocional no válido', 'error');
    }
}

function mostrarMensajePromo(mensaje, tipo) {
    const promoMessage = document.getElementById('promo-message');
    promoMessage.textContent = mensaje;
    promoMessage.className = `promo-message ${tipo}`;
    promoMessage.classList.remove('hidden');

    setTimeout(() => {
        promoMessage.classList.add('hidden');
    }, 5000);
}

function procederAlPago() {
    if (carrito.length === 0) {
        mostrarMensaje('Tu carrito está vacío', 'error');
        return;
    }

    const subtotal = calcularSubtotal();
    const descuento = calcularDescuento(subtotal);
    const envio = subtotal >= 50000 ? 0 : 5000;
    const total = subtotal - descuento + envio;

    let resumen = `Resumen de tu pedido:\\n\\n`;
    
    carrito.forEach(item => {
        resumen += `• ${item.nombre} x${item.cantidad} - ${formatearPrecio(item.precio * item.cantidad)}\\n`;
    });
    
    resumen += `\\nSubtotal: ${formatearPrecio(subtotal)}\\n`;
    
    if (descuento > 0) {
        resumen += `Descuento: -${formatearPrecio(descuento)}\\n`;
    }
    
    if (envio > 0) {
        resumen += `Envío: ${formatearPrecio(envio)}\\n`;
    } else {
        resumen += `Envío: Gratis\\n`;
    }
    
    resumen += `\\nTotal: ${formatearPrecio(total)}\\n\\n`;
    resumen += `¿Deseas proceder con el pago?\\n\\n(Esta es una simulación - en una tienda real se redirigiría a la pasarela de pagos)`;

    if (confirm(resumen)) {
        // Simular proceso de pago exitoso
        alert('¡Pago procesado exitosamente!\\n\\nTu pedido ha sido confirmado y recibirás un email con los detalles.\\n\\nGracias por comprar en Level-Up Gamer.');
        
        // Limpiar carrito después del pago
        carrito = [];
        guardarCarrito();
        mostrarCarrito();
    }
}

function cargarProductosRecomendados() {
    const recommendedGrid = document.getElementById('recommended-products-grid');
    if (!recommendedGrid) return;

    // Obtener productos destacados que no estén en el carrito
    const productosEnCarrito = carrito.map(item => item.id);
    const productosRecomendados = obtenerProductosDestacados()
        .filter(producto => !productosEnCarrito.includes(producto.id))
        .slice(0, 3);

    recommendedGrid.innerHTML = '';

    productosRecomendados.forEach(producto => {
        const productCard = document.createElement('article');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" onerror="this.src='src/images/placeholder.jpg'">
            <h3>${producto.nombre}</h3>
            <p class="price">${formatearPrecio(producto.precio)}</p>
            <button class="add-to-cart" onclick="agregarAlCarritoDesdeRecomendados('${producto.id}')">
                Agregar al Carrito
            </button>
        `;
        recommendedGrid.appendChild(productCard);
    });
}

function agregarAlCarritoDesdeRecomendados(productId) {
    const producto = obtenerProductoPorId(productId);
    if (!producto) return;

    // Verificar si el producto ya está en el carrito
    const itemExistente = carrito.find(item => item.id === productId);
    
    if (itemExistente) {
        if (itemExistente.cantidad < producto.stock) {
            itemExistente.cantidad += 1;
            mostrarMensaje(`Se agregó otra unidad de ${producto.nombre} al carrito`, 'success');
        } else {
            mostrarMensaje(`No hay más stock disponible de ${producto.nombre}`, 'error');
            return;
        }
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
        mostrarMensaje(`${producto.nombre} agregado al carrito`, 'success');
    }
    
    guardarCarrito();
    mostrarCarrito();
    cargarProductosRecomendados(); // Recargar recomendaciones
}

function configurarEventListeners() {
    const clearCartBtn = document.getElementById('clear-cart');
    const applyPromoBtn = document.getElementById('apply-promo');
    const checkoutBtn = document.getElementById('checkout-btn');
    const promoInput = document.getElementById('promo-code');

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', vaciarCarrito);
    }

    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', aplicarCodigoPromo);
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', procederAlPago);
    }

    if (promoInput) {
        promoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                aplicarCodigoPromo();
            }
        });
    }
}

function actualizarContadorCarrito() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
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
        background: ${tipo === 'success' ? '#39FF14' : tipo === 'error' ? '#FF4444' : '#1E90FF'};
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
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

