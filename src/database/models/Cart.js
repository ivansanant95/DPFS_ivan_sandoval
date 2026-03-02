module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        total_price: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
        purchase_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        status: { type: DataTypes.STRING(50), defaultValue: 'Pending' },
        user_id: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        tableName: 'carts',
        timestamps: false
    });

    Cart.associate = (models) => {
        Cart.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
        Cart.hasMany(models.CartProduct, { as: 'cart_products', foreignKey: 'cart_id' });
    };

    return Cart;
};
