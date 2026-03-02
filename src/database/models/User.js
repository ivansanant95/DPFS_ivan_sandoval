module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        first_name: { type: DataTypes.STRING(100), allowNull: false },
        last_name: { type: DataTypes.STRING(100), allowNull: false },
        email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
        password: { type: DataTypes.STRING(255), allowNull: false },
        phone: { type: DataTypes.STRING(50) },
        image: { type: DataTypes.STRING(255), defaultValue: 'default-avatar.png' },
        role_id: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        tableName: 'users',
        timestamps: false
    });

    User.associate = (models) => {
        User.belongsTo(models.Role, { as: 'role', foreignKey: 'role_id' });
        User.hasMany(models.Cart, { as: 'carts', foreignKey: 'user_id' });
    };

    return User;
};
