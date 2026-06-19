import { DataTypes, Model } from 'sequelize';
import db from '../clients/db.sequelize.js';

class Users extends Model {}

Users.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
    },

    age: {
        type: DataTypes.INTEGER,
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
    },

    password: {
        type: DataTypes.STRING,
    },

}, {
    sequelize: db,
    modelName: 'users',
    tableName: 'users',
    timestamps: false,
});

export default Users;