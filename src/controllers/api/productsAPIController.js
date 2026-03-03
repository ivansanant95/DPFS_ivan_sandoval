const db = require('../../database/models');

const productsAPIController = {
    list: async (req, res) => {
        try {
            // Traemos productos y categorías en paralelo
            const [products, categories] = await Promise.all([
                db.Product.findAll({
                    include: [{ association: 'category', attributes: ['name'] }]
                }),
                db.Category.findAll({
                    include: [{ association: 'products', attributes: ['id'] }]
                })
            ]);

            // Formatear countByCategory
            const countByCategory = {};
            categories.forEach(cat => {
                countByCategory[cat.name] = cat.products.length;
            });

            // Formatear array products
            const productsSanitized = products.map(prod => {
                return {
                    id: prod.id,
                    name: prod.name,
                    description: prod.description,
                    // Array requerido con las relaciones de uno a muchos
                    categories: prod.category ? [prod.category.name] : [],
                    detail: `/api/products/${prod.id}`
                }
            });

            return res.status(200).json({
                count: products.length,
                countByCategory,
                products: productsSanitized
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error del servidor buscando productos' });
        }
    },

    detail: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id, {
                include: [{ association: 'category' }]
            });

            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            // Agregamos relations y el endpoint del image absolut
            const productRes = {
                ...product.dataValues,
                relations: [product.category],
                image: `/images/products/${product.image}`
            };

            return res.status(200).json(productRes);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error del servidor buscando el producto' });
        }
    }
};

module.exports = productsAPIController;
