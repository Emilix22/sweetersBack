module.exports = (sequelize, dataTypes) => {

    let alias = 'Product';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.DECIMAL
        },
        description: {
            type: dataTypes.TEXT
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        image: {
            type: dataTypes.STRING
        },
        sale: {
            type: dataTypes.INTEGER
        },
        color_id: {
            type: dataTypes.INTEGER
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        },
        deletedAt: {
            type: dataTypes.DATE
        }
    };

    let config = {
        tableName: 'products',
        timestamps: true,
        paranoid: true
    };

    const Product = sequelize.define(alias, cols, config)

    Product.associate = function(models) {
        Product.belongsTo(models.Color,{
            foreignKey: 'color_id',
            as: 'color'
        })
    }

    return Product;
}