# Retrospectiva del Proyecto (Estrella de Mar)

---

## 🚀 Sprints 4 y 5: Datos y Seguridad (JSON, CRUD, Bcrypt, Sesiones y Multer)

### 🌟 Comenzar a hacer
*   **Gestión Centralizada de Middlewares:** Tratar de crear módulos de funciones middlewares más reutilizables y limpios para mantener el archivo de enrutadores (`usersRoutes.js`) sin sobrecarga de código.
*   **Validaciones en Frontend:** Comenzar a agregar validaciones del lado del cliente antes de enviar la petición (ej. corroborar que el email sea válido o la contraseña tenga cierta longitud usando Javascript del navegador).

### 📈 Hacer más
*   **Uso de Variables de Entorno (.env):** Ocultar parámetros de seguridad (como la palabra secreta de las Cookies `ReparatechSecretKey2026`) de un archivo público a un entorno privado por seguridad.

### 🔁 Continuar haciendo

### 📉 Hacer menos

### 🛑 Dejar de hacer
*   **Subir contraseñas limpias a la RAM temporal (`req.session`):** Borrar el "password hasheado" antes de guardar el registro en caché local, después de instanciar el session id para optimizar la seguridad en caso de volcado de la memoria del servidor.