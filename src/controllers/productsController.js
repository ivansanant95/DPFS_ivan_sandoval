const productsController = {
    // Renderiza la vista de Detalles de un producto
    detail: (req, res) => {
        res.render('products/productDetail');
    },

    // Renderiza la vista del Carrito de compras
    cart: (req, res) => {
        res.render('products/productCart');
    }
};

module.exports = productsController;
