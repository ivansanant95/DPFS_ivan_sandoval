# Reparatech

Bienvenido al repositorio oficial de **Reparatech**, un e-commerce integral dedicado al ecosistema de la telefonía móvil, desarrollado como parte del proyecto final Full Stack en Digital House.

## 📱 Temática del Sitio y Oferta de Servicios

Nuestra plataforma es una solución integral que se divide en tres pilares fundamentales:
* **Venta de Equipos:** Smartphones nuevos y reacondicionados con garantía.
* **Servicio Técnico:** Plataforma para la solicitud, cotización y seguimiento de reparaciones de dispositivos móviles con transparencia.
* **Insumos y Herramientas:** Venta de repuestos originales y herramientas especializadas diseñadas tanto para técnicos independientes como para entusiastas del "Hazlo tú mismo" (DIY).

## 🎯 Público Objetivo

Nuestro mercado apunta a dos grandes segmentos (B2C y B2B):
* **Usuarios Finales (B2C):** Personas que buscan comprar un celular (nuevo o usado) a buen precio, o que necesitan reparar su dispositivo actual mediante un servicio confiable, rápido y con una interfaz intuitiva.
* **Técnicos y Talleres (B2B):** Profesionales de la reparación que requieren de un proveedor constante, rápido y confiable para la compra de repuestos y herramientas especializadas al por mayor o menor.

## 🧑‍💻 Descripción Personal

¡Hola! Soy **Iván Sandoval**, estudiante de 5to año de Ingeniería en Computación de la Universidad Nacional de La Plata (UNLP). Apasionado por la tecnología, el desarrollo de software y la resolución de problemas lógicos y arquitectónicos en aplicaciones web modernas.

## 📋 Tablero de Trabajo Ágil

El seguimiento de las tareas y Sprints de este proyecto se realiza utilizando la metodología Kanban. Puedes ver el progreso en tiempo real del tablero:
* **[Ir al Tablero de Trello de Reparatech](https://trello.com/b/NHXawamd/reparatech-e-commerce)** 

## 🔍 Sitios de Referencia (Inspiración)

Para garantizar la mejor experiencia de usuario (UX) y una interfaz de usuario (UI) estética y funcional, tome como inspiración los siguientes referentes del mercado:

1. **[iFixit](https://www.ifixit.com/):** Elegido por su excelente UX orientada a la venta de herramientas y repuestos, y por la claridad en tutoriales de reparación.
2. **[MercadoLibre](https://www.mercadolibre.com/) / Amazon:** Elegidos por la estructura de su *Detalle de Producto* y su robusto *Carrito de Compras*, generando confianza total.
3. **[BackMarket](https://www.backmarket.com/):** Elegido por su estética fresca y moderna orientada a la venta de equipos reacondicionados.
4. **[El Celu](https://www.elcelu.com.ar/):** Elegido como referente local por la categorización y presentación de sus productos tecnológicos.
5. **[Todo Celu Repuestos](https://tienda.todocelurepuestos.com.ar/):** Elegido por ser un referente directo en la venta de insumos en Argentina, destacando su organización de repuestos por marca y modelo. 

---

## Instrucciones para Usuarios

Para probar las funcionalidades de **Reparatech**, sigue estas instrucciones:

### 1. Inicio del Servidor
* Clonar el repositorio `git clone https://github.com/ivansanant95/DPFS_ivan_sandoval.git`
* Ejecutar `npm install`.
* Configurar la base de datos `reparatech_db` usando los scripts en `src/data/`, primero ejecutar el script `src/data/structure.sql` y luego el script `src/data/data.sql`.
* Configurar las credenciales en `src/database/config.js`.
* Iniciar la aplicación: `npm start` o `node src/app.js`.
* Acceder a: `http://localhost:3000`.

### 2. Cuentas de Prueba
|       Rol         |         Email          | Contraseña  |          Permisos         |
| **Administrador** | `admin@reparatech.com` | `admin123`* | CRUD completo + Dashboard |
| **Cliente**       | `maria@mail.com`       | `admin123`* | Compra, Perfil y Carrito  |

> [!NOTA]
> Puedes crear un nuevo usuario fácilmente desde la sección de **Registro**.

### 3. Flujos 
* **Flujo de Usuario**: Registro de nueva cuenta -> Login -> Edición de Perfil -> Navegación de Productos.
* **Flujo de Compra**: Agregar productos al carrito y visualizar el resumen.
* **Flujo Admin**: Login como administrador -> Acceso al Panel de Control -> Crear/Editar/Eliminar un producto.

### 4. Visualización del Dashboard
* Abre una nueva terminal y navega a la carpeta: `cd dashboard`.
* Ejecutar `npm install`.
* Ejecuta `npm run dev`.
* Accede a la URL `http://localhost:5173`.
* Iniciar sesión con el usuario administrador: `admin@reparatech.com` y `admin123`.

> [!NOTA]
> El Dashboard consume la API de Reparatech (`http://localhost:3000/api`), por lo que el servidor principal debe estar activo para ver los datos.
