module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(150), allowNull: false },
        description: { type: DataTypes.TEXT },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        discount: { type: DataTypes.INTEGER, defaultValue: 0 },
        stock: { type: DataTypes.INTEGER, defaultValue: 0 },
        image: { type: DataTypes.STRING(255), defaultValue: 'default-image.png' },
        category_id: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        tableName: 'products',
        timestamps: false
    });

    Product.associate = (models) => {
        Product.belongsTo(models.Category, { as: 'category', foreignKey: 'category_id' });
        Product.hasMany(models.CartProduct, { as: 'cart_products', foreignKey: 'product_id' });
    };

    return Product;
};
