'use strict';

const ModelName = 'Contacts';

module.exports = (db) => {
    const Sequelize = db.Sequelize;
    const schema = {
        contact: {
            type: Sequelize.STRING,
            allowNull: false
        },
        priority: {
            type: Sequelize.INTEGER
        }
    };

    return db.pg.define(ModelName, schema, {
        // disable the modification of table names
        freezeTableName: true,
        // define the table's name
        tableName: 'P_Contacts',

        classMethods: {
            associate: function (models) {
                models.Contacts.belongsTo(models.ContactTypes, {
                    foreignKey: "contactTypeId"
                });
            }
        }
    });
};