'use strict';

const ModelName = 'Goods';

module.exports = (db) => {
    const Sequelize = db.Sequelize;
    const schema = {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        qty: {
            type: Sequelize.INTEGER
        },
        priceModifier: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING(2048)
        }
    };

    return db.pg.define(ModelName, schema, {
        // disable the modification of table names
        freezeTableName: true,
        // define the table's name
        tableName: 'G_Goods',

        classMethods: {
            associate: function (models) {
                models.Goods.belongsTo(models.GoodsCategories, {
                    foreignKey: "categoryId"
                })
            }
        }
    });
};