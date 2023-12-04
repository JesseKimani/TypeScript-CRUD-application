import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

interface VehicleAttributes {
    id?: number;
    registration: string;
    model: string;
    completed: boolean;
};

interface VehicleCreationAttributes extends VehicleAttributes {}

class Vehicle extends Model<VehicleAttributes, VehicleCreationAttributes> implements VehicleAttributes {
    public id!: number;
    public registration!: string;
    public model!: string;
    public completed!: boolean;
}
Vehicle.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        registration: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        
    },
    {
        sequelize,
        tableName: 'vehicles',
        timestamps: false,
    }

);

export default Vehicle;

