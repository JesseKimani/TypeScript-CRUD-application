"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
;
class Vehicle extends sequelize_1.Model {
}
Vehicle.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    registration: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    completed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: 'vehicles',
    modelName: 'Vehicle',
    timestamps: false,
});
// export { Vehicle };
exports.default = Vehicle;
