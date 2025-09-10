// Base de datos simulada de productos
const productos = [
    // Juegos de Mesa
    {
        id: 'JM001',
        categoria: 'juegos-mesa',
        nombre: 'Monopoly',
        precio: 35990,
        imagen: 'src/images/productos/monopoly.jpg',
        descripcion: 'El clásico juego de bienes raíces donde compras, vendes y negocias para convertirte en el más rico. Ideal para 2-8 jugadores.',
        stock: 20,
        rating: 4.7,
        reviews: 300
    },
    {
        id: 'JM002',
        categoria: 'juegos-mesa',
        nombre: 'El Juego de la Vida',
        precio: 28990,
        imagen: 'src/images/productos/juego-de-la-vida.jpg',
        descripcion: 'Un emocionante juego donde tomas decisiones importantes en tu camino por la vida, desde la universidad hasta la jubilación. Para 2-6 jugadores.',
        stock: 12,
        rating: 4.5,
        reviews: 180
    },
    
    // Accesorios
    {
        id: 'AC001',
        categoria: 'accesorios',
        nombre: 'Controlador Inalámbrico Xbox Series X',
        precio: 59990,
        imagen: 'src/images/productos/xbox-controller.jpg',
        descripcion: 'Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.',
        stock: 25,
        rating: 4.9,
        reviews: 256
    },
    {
        id: 'AC002',
        categoria: 'accesorios',
        nombre: 'Auriculares Gamer HyperX Cloud II',
        precio: 79990,
        imagen: 'src/images/productos/hyperx-headset.jpg',
        descripcion: 'Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego.',
        stock: 18,
        rating: 4.7,
        reviews: 342
    },
    
    // Consolas
    {
        id: 'CO001',
        categoria: 'consolas',
        nombre: 'PlayStation 5',
        precio: 549990,
        imagen: 'src/images/productos/ps5.jpg',
        descripcion: 'La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.',
        stock: 5,
        rating: 4.9,
        reviews: 1024
    },
    {
        id: 'CO002',
        categoria: 'consolas',
        nombre: 'Xbox Series X',
        precio: 499990,
        imagen: 'src/images/productos/Xbox-Series-Xx.jpg',
        descripcion: 'La consola más potente de Microsoft con capacidades 4K y retrocompatibilidad con miles de juegos. ',
        stock: 7,
        rating: 4.8,
        reviews: 876
    },
    
    // Computadores Gamers
    {
        id: 'CG001',
        categoria: 'computadores',
        nombre: 'PC Gamer ASUS ROG Strix',
        precio: 1299990,
        imagen: 'src/images/productos/pc-gamer.jpg',
        descripcion: 'Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego.',
        stock: 3,
        rating: 4.9,
        reviews: 156
    },
    {
        id: 'CG002',
        categoria: 'computadores',
        nombre: 'PC Gamer MSI Gaming',
        precio: 899990,
        imagen: 'src/images/productos/msi-gaming-pc.jpg',
        descripcion: 'Computador gaming de gama media-alta con excelente relación precio-rendimiento para juegos modernos.',
        stock: 4,
        rating: 4.6,
        reviews: 98
    },
    
    // Sillas Gamers
    {
        id: 'SG001',
        categoria: 'sillas',
        nombre: 'Silla Gamer Secretlab Titan',
        precio: 349990,
        imagen: 'src/images/productos/silla-gamer.jpg',
        descripcion: 'Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.',
        stock: 12,
        rating: 4.8,
        reviews: 234
    },
    {
        id: 'SG002',
        categoria: 'sillas',
        nombre: 'Silla Gamer DXRacer Formula',
        precio: 249990,
        imagen: 'src/images/productos/dxracer-chair.jpg',
        descripcion: 'Silla ergonómica con diseño deportivo, ideal para largas sesiones de gaming con soporte lumbar ajustable.',
        stock: 8,
        rating: 4.5,
        reviews: 167
    },
    
    // Mouse
    {
        id: 'MS001',
        categoria: 'mouse',
        nombre: 'Mouse Gamer Logitech G502 HERO',
        precio: 49990,
        imagen: 'src/images/productos/logitech-mouse.jpg',
        descripcion: 'Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización.',
        stock: 30,
        rating: 4.7,
        reviews: 445
    },
    {
        id: 'MS002',
        categoria: 'mouse',
        nombre: 'Mouse Gamer Razer DeathAdder V3',
        precio: 54990,
        imagen: 'src/images/productos/razer-mouse.jpg',
        descripcion: 'Mouse ergonómico con sensor óptico de 30,000 DPI y switches ópticos para máxima precisión y durabilidad.',
        stock: 22,
        rating: 4.8,
        reviews: 312
    },
    
    // Mousepad
    {
        id: 'MP001',
        categoria: 'mousepad',
        nombre: 'Mousepad Razer Goliathus Extended Chroma',
        precio: 29990,
        imagen: 'src/images/productos/razer-mousepad.jpg',
        descripcion: 'Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse.',
        stock: 45,
        rating: 4.6,
        reviews: 278
    },
    {
        id: 'MP002',
        categoria: 'mousepad',
        nombre: 'Mousepad SteelSeries QcK Heavy',
        precio: 19990,
        imagen: 'src/images/productos/steelseries-mousepad.jpg',
        descripcion: 'Mousepad de tela de alta calidad con base de goma antideslizante, perfecto para gaming de precisión.',
        stock: 35,
        rating: 4.5,
        reviews: 189
    },
    
    // Poleras Personalizadas
    {
        id: 'PP001',
        categoria: 'poleras',
        nombre: 'Polera Gamer Personalizada \'Level-Up\'',
        precio: 14990,
        imagen: 'src/images/productos/polera-levelup.jpg',
        descripcion: 'Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito.',
        stock: 50,
        rating: 4.4,
        reviews: 156
    },
    {
        id: 'PP002',
        categoria: 'poleras',
        nombre: 'Polera Retro Gaming',
        precio: 16990,
        imagen: 'src/images/productos/polera-retro.jpg',
        descripcion: 'Polera con diseños clásicos de videojuegos retro, perfecta para mostrar tu pasión por el gaming.',
        stock: 40,
        rating: 4.3,
        reviews: 98
    }
];

// Categorías disponibles
const categorias = [
    { id: 'juegos-mesa', nombre: 'Juegos de Mesa', descripcion: 'Juegos de mesa para toda la familia' },
    { id: 'accesorios', nombre: 'Accesorios', descripcion: 'Controles, auriculares y más accesorios gaming' },
    { id: 'consolas', nombre: 'Consolas', descripcion: 'PlayStation, Xbox y Nintendo' },
    { id: 'computadores', nombre: 'Computadores Gamers', descripcion: 'PCs de alto rendimiento para gaming' },
    { id: 'sillas', nombre: 'Sillas Gamers', descripcion: 'Sillas ergonómicas para largas sesiones' },
    { id: 'mouse', nombre: 'Mouse', descripcion: 'Mouse gaming de alta precisión' },
    { id: 'mousepad', nombre: 'Mousepad', descripcion: 'Superficies optimizadas para gaming' },
    { id: 'poleras', nombre: 'Poleras Personalizadas', descripcion: 'Ropa gamer personalizable' }
];

// Funciones para obtener productos
function obtenerTodosLosProductos() {
    return productos;
}

function obtenerProductosPorCategoria(categoria) {
    return productos.filter(producto => producto.categoria === categoria);
}

function obtenerProductoPorId(id) {
    return productos.find(producto => producto.id === id);
}

function buscarProductos(termino) {
    const terminoLower = termino.toLowerCase();
    return productos.filter(producto => 
        producto.nombre.toLowerCase().includes(terminoLower) ||
        producto.descripcion.toLowerCase().includes(terminoLower) ||
        producto.categoria.includes(terminoLower)
    );
}

function filtrarProductosPorPrecio(min, max) {
    return productos.filter(producto => producto.precio >= min && producto.precio <= max);
}

function obtenerProductosDestacados() {
    return productos.filter(producto => producto.rating >= 4.7).slice(0, 6);
}

function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
    }).format(precio);
}

function generarEstrellas(rating) {
    const estrellas = Math.round(rating);
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= estrellas) {
            html += '★';
        } else {
            html += '☆';
        }
    }
    return html;
}


