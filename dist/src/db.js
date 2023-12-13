"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// const sequelize = new Sequelize(config.development);
const sequelize = new sequelize_1.Sequelize('vehicles', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});
sequelize.sync({ force: false }).then(() => {
    console.log('DB and tables synchronized');
});
exports.default = sequelize;
