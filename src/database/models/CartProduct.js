module.exports = (sequelize, DataTypes) => {
    const CartProduct = sequelize.define('CartProduct', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        cart_id: { type: DataTypes.INTEGER, allowNull: false },
        product_id: { type: DataTypes.INTEGER, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        unit_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
    }, {
        tableName: 'cart_products',
        timestamps: false
    });

    CartProduct.associate = (models) => {
        CartProduct.belongsTo(models.Cart, { as: 'cart', foreignKey: 'cart_id' });
        CartProduct.belongsTo(models.Product, { as: 'product', foreignKey: 'product_id' });
    };

    return CartProduct;
};
