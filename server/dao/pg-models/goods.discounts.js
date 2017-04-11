'use strict';

const ModelName = 'Discounts';

module.exports = (db) => {
    const Sequelize = db.Sequelize;
    const schema = {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        priceModifier: {
            type: Sequelize.INTEGER
        }
    };

    return db.pg.define(ModelName, schema, {
        // disable the modification of table names
        freezeTableName: true,
        // define the table's name
        tableName: 'G_Discounts',

        classMethods: {
            associate: function (models) {
                models.Discounts.hasMany(models.Goods, {
                    foreignKey: "discountId"
                });

            }
        }
    });
};