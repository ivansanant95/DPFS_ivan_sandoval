const productsController = {
    // Renderiza la vista de Detalles de un producto
    detail: (req, res) => {
        res.render('products/productDetail');
    },

    // Renderiza la vista del Carrito de compras
    cart: (req, res) => {
        res.render('products/productCart');
    },

    // Renderiza el formulario de Creación de Producto
    create: (req, res) => {
        res.render('products/productCreate');
    },

    // Renderiza el formulario de Edición de Producto
    edit: (req, res) => {
        res.render('products/productEdit');
    }
};

module.exports = productsController;
