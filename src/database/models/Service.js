module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(150), allowNull: false },
        description: { type: DataTypes.TEXT },
        estimated_time: { type: DataTypes.STRING(50) }, // ej: "2 a 4 horas", "En el día"
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        discount: { type: DataTypes.INTEGER, defaultValue: 0 },
        image: { type: DataTypes.STRING(255), defaultValue: 'default-service.png' }
    }, {
        tableName: 'services',
        timestamps: false
    });

    return Service;
};
