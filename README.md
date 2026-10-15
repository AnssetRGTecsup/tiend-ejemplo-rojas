# Tienda en Línea - Documentación de Modificaciones y Nuevas Funcionalidades

## 📌 Resumen General
Se mantuvieron las características principales de la tienda electrónica original, agregando mejoras sencillas y esenciales para mejorar la experiencia de usuario (UX), el diseño visual y la persistencia de datos.

---

## 🚀 Principales Cambios e Incremento de Funcionalidades

### 1. `index.html`
* **Buscador de Productos:** Se incorporó un campo de entrada (`<input id="input-busqueda">`) en la barra superior para búsquedas rápidas.
* **Filtros de Categoría:** Se agregaron botones en la interfaz para filtrar los productos según su categoría (`Tecnología`, `Ropa`, `Accesorios`, `Todos`).
* **Contenedor Toast:** Se agregó un elemento flotante para mostrar alertas/notificaciones emergentes breves al usuario.
* **Acciones en Carrito:** Se incorporó un botón para **Vaciar Carrito** e interacción de alerta para **Finalizar Compra**.

### 2. `estilos.css`
* **Sistema de Variables CSS (`:root`):** Definición centralizada de colores, bordes y sombras para mantener consistencia visual.
* **Diseño Adaptable (Responsive Grid):** La grilla de productos utiliza `grid-template-columns: repeat(auto-fill, ...)` facilitando una excelente visualización tanto en dispositivos móviles como de escritorio.
* **Efectos Hover y Animaciones:** Transiciones suaves para las tarjetas de producto, botones y la notificación Toast emergente.

### 3. `script.js`
* **Persistencia con `localStorage`:** Los productos agregados al carrito no se pierden al recargar o cerrar la página.
* **Búsqueda en Tiempo Real:** Filtrado interactivo dinámico mientras el usuario escribe en el buscador.
* **Filtrado Combinado:** Se procesa la coincidencia tanto del texto buscado como de la categoría seleccionada al mismo tiempo.
* **Notificaciones Flotantes (Toast):** Alertas no invasivas al añadir, eliminar o vaciar el carrito.