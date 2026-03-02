USE reparatech_db;

-- Insertar Roles
INSERT INTO `roles` (`name`) VALUES 
('admin'), 
('customer');

-- Insertar Categorías
INSERT INTO `categories` (`name`, `description`) VALUES 
('Celulares', 'Smartphones y teléfonos móviles'),
('Herramientas', 'Herramientas de reparación técnica y soldado'),
('Repuestos', 'Pantallas, baterías, pines de carga y componentes');

-- Insertar Usuarios (Password hasheada es '12345678')
INSERT INTO `users` (`first_name`, `last_name`, `email`, `password`, `phone`, `role_id`) VALUES
('Admin', 'Reparatech', 'admin@reparatech.com', '$2a$10$wT/pYl1L0q5M7YQ4dIQhEut/jUvX/fQxM1P3z/7t1gC9/5T4A6MZa', '1122334455', 1),
('María', 'Gómez', 'maria@mail.com', '$2a$10$wT/pYl1L0q5M7YQ4dIQhEut/jUvX/fQxM1P3z/7t1gC9/5T4A6MZa', '5544332211', 2);

-- Insertar Productos
INSERT INTO `products` (`name`, `description`, `price`, `discount`, `stock`, `category_id`) VALUES
('iPhone 13', 'Apple iPhone 13 128GB - Excelente estado', 1200000.00, 10, 5, 1),
('Destornillador Tri-Wing', 'Especial para reparar equipos Apple y Nintendo', 8500.00, 0, 50, 2),
('Módulo Pantalla S22', 'Pantalla Amoled original para Samsung Galaxy S22', 150000.00, 5, 12, 3);

-- Insertar un Carrito Activo (Pending) 
INSERT INTO `carts` (`total_price`, `status`, `user_id`) VALUES
(158500.00, 'Pending', 2);

-- Insertar Detalle de ese carrito (María compró 1 pantalla y 1 destornillador)
INSERT INTO `cart_products` (`cart_id`, `product_id`, `quantity`, `unit_price`) VALUES
(1, 3, 1, 150000.00),
(1, 2, 1, 8500.00);
