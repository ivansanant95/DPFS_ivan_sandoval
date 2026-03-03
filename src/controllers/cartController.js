const db = require('../database/models');

const cartController = {
    // 1. Ver el carrito
    viewCart: async (req, res) => {
        try {
            if (!req.session.userLogged) {
                // Invitado: leer de la sesión
                if (!req.session.guestCart) req.session.guestCart = [];
                let total = 0;
                req.session.guestCart.forEach(item => {
                    total += parseFloat(item.unit_price) * item.quantity;
                });
                return res.render('carts/cart', { cartProducts: req.session.guestCart, total: total });
            }

            if (req.session.userLogged && req.session.userLogged.role_id === 1) {
                // Admin no debe tener carrito
                return res.redirect('/');
            }

            const userId = req.session.userLogged.id;

            // Buscar el carrito pendiente del usuario logueado, incluyendo sus productos
            const cart = await db.Cart.findOne({
                where: { user_id: userId, status: 'Pending' },
                include: [{
                    model: db.CartProduct,
                    as: 'cart_products',
                    include: [{ model: db.Product, as: 'product' }]
                }]
            });

            if (!cart || cart.cart_products.length === 0) {
                return res.render('carts/cart', { cartProducts: [], total: 0 });
            }

            // Calcular el precio total dinámicamente
            let total = 0;
            cart.cart_products.forEach(item => {
                total += parseFloat(item.unit_price) * item.quantity;
            });

            return res.render('carts/cart', {
                cartProducts: cart.cart_products,
                total: total
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error loading cart');
        }
    },

    // 2. Agregar producto al carrito
    addToCart: async (req, res) => {
        try {
            const productId = req.params.id;
            const quantity = parseInt(req.body.quantity) || 1;
            const product = await db.Product.findByPk(productId);
            if (!product) return res.status(404).send('Product not found');

            if (!req.session.userLogged) {
                // Invitado: Guardar en sesión RAM
                if (!req.session.guestCart) req.session.guestCart = [];

                let existingItem = req.session.guestCart.find(item => item.product_id == productId);
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    req.session.guestCart.push({
                        id: product.id, // Lo usamos como identificador en la sesión
                        product_id: product.id,
                        quantity: quantity,
                        unit_price: product.price, // Precio normal sin descuento
                        product: { // Mock para la vista
                            id: product.id,
                            name: product.name,
                            image: product.image,
                            price: product.price
                        }
                    });
                }
                return res.redirect(req.get('Referrer') || '/');
            }

            if (req.session.userLogged && req.session.userLogged.role_id === 1) {
                // Admin no debe agregar cosas al carrito
                return res.redirect('/');
            }

            const userId = req.session.userLogged.id;

            // Buscar o crear un carrito pendiente para el usuario (Socio)
            let [cart, created] = await db.Cart.findOrCreate({
                where: { user_id: userId, status: 'Pending' },
                defaults: { total_price: 0 }
            });

            // Verificar si el producto ya está en la tabla CartProduct
            const existingCartItem = await db.CartProduct.findOne({
                where: { cart_id: cart.id, product_id: product.id }
            });

            if (existingCartItem) {
                // Si existe, aumentar la cantidad
                await existingCartItem.update({
                    quantity: existingCartItem.quantity + quantity
                });
            } else {
                // Calculate actual price with discount to save it as the unit_price snapshot
                let finalPrice = product.price;
                if (product.discount && product.discount > 0) {
                    finalPrice = product.price - (product.price * product.discount / 100);
                }

                // If not, add it to the cart
                await db.CartProduct.create({
                    cart_id: cart.id,
                    product_id: product.id,
                    quantity: quantity,
                    unit_price: finalPrice // Snapshot of the price at the time of adding
                });
            }

            return res.redirect(req.get('Referrer') || '/');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error adding to cart');
        }
    },

    // 3. Actualizar la cantidad de un producto en el carrito
    updateCartItem: async (req, res) => {
        try {
            const cartProductId = req.params.id;
            const { action } = req.body; // 'increase' or 'decrease'

            if (!req.session.userLogged) {
                // Invitado
                if (req.session.guestCart) {
                    let item = req.session.guestCart.find(i => i.id == cartProductId);
                    if (item) {
                        if (action === 'increase') item.quantity += 1;
                        else if (action === 'decrease' && item.quantity > 1) item.quantity -= 1;
                    }
                }
                return res.redirect('/cart');
            }

            // Socio: Base de Datos
            const cartItem = await db.CartProduct.findByPk(cartProductId);
            if (!cartItem) return res.status(404).send('Cart item not found');

            let newQuantity = cartItem.quantity;
            if (action === 'increase') {
                newQuantity += 1;
            } else if (action === 'decrease' && newQuantity > 1) {
                newQuantity -= 1;
            }

            await cartItem.update({ quantity: newQuantity });
            return res.redirect('/cart');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating cart');
        }
    },

    // 4. Eliminar un producto del carrito
    removeCartItem: async (req, res) => {
        try {
            const cartProductId = req.params.id;

            if (!req.session.userLogged) {
                // Invitado
                if (req.session.guestCart) {
                    req.session.guestCart = req.session.guestCart.filter(i => i.id != cartProductId);
                }
                return res.redirect('/cart');
            }

            // Socio
            await db.CartProduct.destroy({
                where: { id: cartProductId }
            });

            return res.redirect('/cart');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error removing from cart');
        }
    },

    // 5. Simulación de Checkout
    checkout: async (req, res) => {
        try {
            let cartProducts = [];
            let total = 0;

            if (!req.session.userLogged) {
                cartProducts = req.session.guestCart || [];
            } else {
                const userId = req.session.userLogged.id;
                const cart = await db.Cart.findOne({
                    where: { user_id: userId, status: 'Pending' },
                    include: [{
                        model: db.CartProduct,
                        as: 'cart_products',
                        include: [{ model: db.Product, as: 'product' }]
                    }]
                });
                if (cart) cartProducts = cart.cart_products;
            }

            cartProducts.forEach(item => {
                total += parseFloat(item.unit_price) * item.quantity;
            });

            if (cartProducts.length === 0) return res.redirect('/cart');

            res.render('carts/checkout', { cartProducts, total });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error loading checkout');
        }
    },

    confirmOrder: async (req, res) => {
        try {
            if (!req.session.userLogged) {
                // Limpiar carrito de sesión
                req.session.guestCart = [];
            } else {
                // Cambiar estado del carrito en DB
                const userId = req.session.userLogged.id;
                await db.Cart.update(
                    { status: 'Completed' },
                    { where: { user_id: userId, status: 'Pending' } }
                );
            }
            res.render('carts/orderSuccess');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error confirming order');
        }
    }
};

module.exports = cartController;
