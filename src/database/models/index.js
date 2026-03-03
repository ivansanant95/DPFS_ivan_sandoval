const { Sequelize } = require('sequelize');
const config = require('../config/config.js').development;

// Inicializamos la conexión a MySQL usando los datos de config.js
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

// 1. Inicializar Modelos
db.Role = require('./Role')(sequelize, Sequelize.DataTypes);
db.User = require('./User')(sequelize, Sequelize.DataTypes);
db.Category = require('./Category')(sequelize, Sequelize.DataTypes);
db.Product = require('./Product')(sequelize, Sequelize.DataTypes);
db.Cart = require('./Cart')(sequelize, Sequelize.DataTypes);
db.CartProduct = require('./CartProduct')(sequelize, Sequelize.DataTypes);
db.Service = require('./Service')(sequelize, Sequelize.DataTypes);

// 2. Ejecutar Asociaciones (Relaciones entre tablas)
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
