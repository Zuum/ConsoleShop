'use strict';

const ModelName = 'ContactTypes';

module.exports = (db) => {
    const Sequelize = db.Sequelize;
    const schema = {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    };

    return db.pg.define(ModelName, schema, {
        // disable the modification of table names
        freezeTableName: true,
        // define the table's name
        tableName: 'P_ContactTypes',

        classMethods: {
            associate: function (models) {
                models.ContactTypes.hasMany(models.Contacts, {
                    foreignKey: "contactTypeId"
                });
            }
        }
    });
};