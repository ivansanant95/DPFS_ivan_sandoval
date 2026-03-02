module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(50), allowNull: false }
    }, {
        tableName: 'roles',
        timestamps: false
    });

    Role.associate = (models) => {
        Role.hasMany(models.User, { as: 'users', foreignKey: 'role_id' });
    };

    return Role;
};
