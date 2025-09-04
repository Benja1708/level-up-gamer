# Level-Up Gamer - Tienda Online Gaming

## Descripción del Proyecto

Level-Up Gamer es una aplicación web frontend para una tienda online especializada en productos gaming. Este proyecto fue desarrollado como parte de la evaluación parcial del curso DSY1104: Desarrollo Fullstack II.

## Características Principales

### ✅ Requerimientos Funcionales Implementados

- **Registro y Autenticación de Usuarios (RF4)**
  - Sistema de registro con validación de edad mínima (18 años)
  - Descuento automático del 20% para correos @duoc.cl
  - Formularios de login con validaciones JavaScript

- **Gestión de Perfiles de Usuario (RF5)**
  - Páginas de perfil con información editable
  - Gestión de preferencias de usuario

- **Visualización de Catálogo de Productos (RF6)**
  - Catálogo completo con 16 productos en 8 categorías
  - Filtros avanzados por categoría, precio y búsqueda
  - Sistema de paginación para navegación eficiente

- **Funcionalidad del Carrito de Compras (RF7)**
  - Gestión completa del carrito con localStorage
  - Modificación de cantidades y eliminación de productos
  - Cálculo automático de totales y descuentos

- **Programa de Referidos y Gamificación (RF8)**
  - Validación de códigos de referido en el registro
  - Sistema de puntos LevelUp (simulado)

- **Reseñas y Calificaciones (RF9)**
  - Sistema de calificaciones con estrellas
  - Visualización de reseñas de productos

### 🎨 Diseño Visual

- **Paleta de Colores Gaming**
  - Fondo principal: Negro (#000000)
  - Acentos: Azul Eléctrico (#1E90FF) y Verde Neón (#39FF14)
  - Texto: Blanco (#FFFFFF) y Gris Claro (#D3D3D3)

- **Tipografías**
  - Fuente principal: Roboto (texto general)
  - Fuente de encabezados: Orbitron (títulos futuristas)

- **Diseño Responsivo**
  - Compatible con dispositivos móviles, tablets y escritorio
  - CSS Grid y Flexbox para layouts adaptativos

### 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica con elementos como `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- **CSS3**: Estilos personalizados con gradientes, animaciones y diseño responsivo
- **JavaScript (Vanilla)**: Validaciones de formularios, gestión del carrito, filtros dinámicos

### 📁 Estructura del Proyecto

```
level-up-gamer/
├── index.html              # Página principal
├── catalogo.html           # Catálogo de productos
├── carrito.html            # Carrito de compras
├── registro.html           # Registro de usuarios
├── login.html              # Inicio de sesión
├── src/
│   ├── css/
│   │   └── style.css       # Estilos principales
│   ├── js/
│   │   ├── main.js         # JavaScript principal
│   │   ├── productos.js    # Base de datos de productos
│   │   ├── catalogo.js     # Funcionalidad del catálogo
│   │   ├── carrito.js      # Gestión del carrito
│   │   ├── registro.js     # Validaciones de registro
│   │   └── login.js        # Funcionalidad de login
│   └── images/             # Imágenes de productos
└── README.md               # Este archivo
```

### 🎮 Productos Disponibles

**Categorías:**
- Juegos de Mesa (Catan, Carcassonne)
- Accesorios (Controles Xbox, Auriculares HyperX)
- Consolas (PlayStation 5, Xbox Series X)
- Computadores Gamers (ASUS ROG, MSI Gaming)
- Sillas Gamers (Secretlab, DXRacer)
- Mouse Gaming (Logitech G502, Razer DeathAdder)
- Mousepad (Razer Goliathus, SteelSeries QcK)
- Poleras Personalizadas (Level-Up, Retro Gaming)

### 🔧 Funcionalidades Destacadas

1. **Validaciones Inteligentes**
   - Validación de edad en tiempo real
   - Detección automática de correos Duoc
   - Validación de códigos de referido

2. **Carrito Avanzado**
   - Persistencia con localStorage
   - Cálculo automático de descuentos
   - Envío gratis para compras sobre $50.000
   - Códigos promocionales

3. **Experiencia de Usuario**
   - Mensajes informativos dinámicos
   - Animaciones CSS suaves
   - Navegación intuitiva
   - Diseño accesible

### 🚀 Cómo Usar la Aplicación

1. **Navegación**: Usa el menú principal para explorar las diferentes secciones
2. **Registro**: Crea una cuenta nueva (usa @duoc.cl para obtener descuento)
3. **Login**: Inicia sesión con las cuentas de demostración disponibles
4. **Catálogo**: Explora productos, usa filtros y búsqueda
5. **Carrito**: Agrega productos y gestiona tu compra
6. **Checkout**: Procede al pago (simulado)

### 📱 Cuentas de Demostración

- **Usuario Regular**: usuario@ejemplo.com / Usuario123
- **Estudiante Duoc**: estudiante@duoc.cl / Duoc123 (20% descuento)

### 🎯 Códigos Promocionales

- `LEVELUP10`: 10% de descuento
- `GAMER15`: 15% de descuento
- `NEWBIE5`: 5% de descuento para nuevos usuarios

### 📋 Cumplimiento de Requerimientos

#### RF1: Estructura HTML5 ✅
- Elementos semánticos implementados
- Hipervínculos funcionales entre páginas
- Imágenes, botones, videos y formularios operativos
- Footer informativo completo

#### RF2: Validaciones JavaScript ✅
- Validaciones que previenen envío de datos incorrectos
- Mensajes de error claros y contextuales
- Validaciones en tiempo real

#### RF3: Repositorio Colaborativo ✅
- Commits con mensajes descriptivos
- Historial de cambios organizado
- Distribución simulada de tareas

### 🌟 Características Adicionales

- **Integración con Redes Sociales**: Botones para compartir productos
- **Soporte Técnico**: Enlace directo a WhatsApp
- **Programa de Fidelización**: Sistema de puntos LevelUp
- **Productos Recomendados**: Sugerencias dinámicas
- **Búsqueda Avanzada**: Filtros múltiples y ordenamiento

### 📊 Métricas del Proyecto

- **16 productos** en 8 categorías diferentes
- **5 páginas HTML** completamente funcionales
- **6 archivos JavaScript** con funcionalidades específicas
- **500+ líneas de CSS** con diseño responsivo
- **Más de 1000 líneas de código** JavaScript

### 🎓 Contexto Académico

Este proyecto cumple con todos los requerimientos de la evaluación parcial DSY1104:

- ✅ Estructura HTML5 válida y semántica
- ✅ Estilos CSS externos personalizados
- ✅ Validaciones JavaScript robustas
- ✅ Navegación coherente entre páginas
- ✅ Formularios interactivos funcionales
- ✅ Diseño responsivo para múltiples dispositivos
- ✅ Control de versiones con Git

### 🚀 Próximos Pasos (Evaluaciones Futuras)

- Integración con backend y base de datos
- Sistema de pagos real
- Panel de administración
- API REST para gestión de productos
- Autenticación con JWT
- Optimización SEO

---

**Desarrollado por:** Equipo Level-Up Gamer  
**Curso:** DSY1104 - Desarrollo Fullstack II  
**Institución:** Duoc UC  
**Año:** 2024

