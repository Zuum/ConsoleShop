'use strict';

const ModelName = 'Links';

module.exports = (db) => {
    const Sequelize = db.Sequelize;
    const schema = {
        link: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        parentId: {
            type: Sequelize.INTEGER
        }
    };

    return db.pg.define(ModelName, schema, {
        // disable the modification of table names
        freezeTableName: true,
        // define the table's name
        tableName: 'N_Links',

        classMethods: {
            associate: function (models) {

            }
        }
    });
};