-- 1. Creación de la Base de Datos
CREATE DATABASE IF NOT EXISTS reparatech_db;
USE reparatech_db;

-- 2. Creación de tablas secundarias (Las que no tienen Foráneas)
CREATE TABLE `roles` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL
);

CREATE TABLE `categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255)
);

-- 3. Creación de tablas principales
CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50),
    `image` VARCHAR(255) DEFAULT 'default-avatar.png',
    `role_id` INT NOT NULL,
    FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`)
);

CREATE TABLE `products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `description` TEXT,
    `price` DECIMAL(10,2) NOT NULL,
    `discount` INT DEFAULT 0,
    `stock` INT DEFAULT 0,
    `image` VARCHAR(255) DEFAULT 'default-image.png',
    `category_id` INT NOT NULL,
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`)
);

-- 4. Creación del módulo transaccional (Carrito)
CREATE TABLE `carts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `total_price` DECIMAL(10,2) DEFAULT 0,
    `purchase_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `status` VARCHAR(50) DEFAULT 'Pending',
    `user_id` INT NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

CREATE TABLE `cart_products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `cart_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `quantity` INT NOT NULL DEFAULT 1,
    `unit_price` DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`),
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
);
