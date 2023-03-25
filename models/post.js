const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        post: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: [100],
            },
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: [20],
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id',
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

    module.exports = Post; 