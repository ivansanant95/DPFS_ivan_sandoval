# Retrospectiva del Proyecto (Estrella de Mar)

---

## 🚀 Sprint 6: Base de Datos Relacional y ORM (MySQL + Sequelize)

### 🌟 Comenzar a hacer
*   **Manejo Elegante de Errores de BD:** Interceptar códigos de error nativos o validaciones fallidas antes de que crasheen toda la aplicación, envolviendo siempre los queries del ORM en estructuras `try-catch`.

### 📈 Hacer más
*   **Uso del ORM:** Profundizar en las capacidades asíncronas de Sequelize explotando relaciones como `.belongsTo` y `.hasMany` directamente desde el Controller.

### 🔁 Continuar haciendo
*   **Separación de Lógica y Vistas:** Conservar la nomenclatura de base de datos intacta (ej: `first_name` en SQL) mientras se mapea los objetos al CamelCase que el sistema esperaba previamente (`firstName`) para no quebrar las vistas gráficas del EJS.

### 📉 Hacer menos
*   **Depender de Archivos Estáticos:** Disminuir el acoplamiento a documentos almacenados permanentemente en las carpetas públicas que pueden faltar

