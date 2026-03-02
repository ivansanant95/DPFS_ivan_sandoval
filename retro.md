# Retrospectiva - Sprint 3 (Estrella de Mar)

A continuación se detallan las conclusiones al finalizar el tercer sprint de desarrollo (Motor de Plantillas y MVC).

## 🌟 Comenzar a hacer
*   **Planificar las Rutas con precisión:** Ser muy cuidadosos con los métodos HTTP (GET, POST, PUT, DELETE) y asegurar que cada vista apunte a la ruta correcta.
*   **Manejo de IDs:** Empezar a pensar cómo pasaremos el Identificador Único (`id`) de los productos a través de las rutas URL (ej: `/products/12/edit`).

## 📈 Hacer más
*   **Testing de Servidor Local:** Levantar el servidor (`node src/app.js`) y navegar la página constantemente luego de cada cambio para corregir errores de enrutamiento rápido.


## 🔁 Continuar haciendo
*   **Separación MVC (Modelo-Vista-Controlador):** La estructura `/src` dividida en views, routes y controllers ha dejado el proyecto muy ordenado.
*   **Uso de Partials:** Mantener y extender el uso de EJS para no repetir código HTML.

## 📉 Hacer menos
*   **Código Hardcodeado:** Usar variables pasadas desde el Controlador.

## 🛑 Dejar de hacer
*   **Enlaces HTML quemados:** Olvidarnos de actualizar los `href` o los `action` de los formularios al mover archivos. Debemos revisarlos siempre
