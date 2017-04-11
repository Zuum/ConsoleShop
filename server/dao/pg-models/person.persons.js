'use strict';

const ModelName = 'Persons';

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
        tableName: 'P_Persons',

        classMethods: {
            associate: function (models) {
                models.Persons.hasMany(models.Contacts, {
                    foreignKey: "personId"
                });
            }
        }
    });
};