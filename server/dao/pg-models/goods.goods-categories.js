'use strict';

const ModelName = 'GoodsCategories';

module.exports = (db) => {
    const Sequelize = db.Sequelize;
    const schema = {
      name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
            type: Sequelize.STRING(2048)
      },
      parentId: {
          type: Sequelize.INTEGER
      }
    };

    return db.pg.define(ModelName, schema, {
        // disable the modification of table names
        freezeTableName: true,
        // define the table's name
        tableName: 'G_GoodsCategories',

        classMethods: {
            associate: function (models) {
                models.GoodsCategories.hasMany(models.Goods, {
                    foreignKey: "categoryId"
                })
            }
        }
    });
};