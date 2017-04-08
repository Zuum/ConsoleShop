'use strict';

const ModelName = 'Users';

module.exports = (db) => {
    const Sequelize = db.Sequelize;
    const schema = {
        login: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        passwordHashed: {
            type: Sequelize.STRING,
            allowNull: false
        },
        salt: {
            type: Sequelize.STRING,
            allowNull: false
        },
        token: {
            type: Sequelize.STRING
        },
        resetToken: {
            type: Sequelize.STRING
        },
        resetTokenExpiration: {
            type: Sequelize.DATE
        },
        personId: {
            type: Sequelize.BIGINT
        }
    };

    return db.pg.define(ModelName, schema, {
        // disable the modification of table names
        freezeTableName: true,
        // define the table's name
        tableName: 'S_Users',

        classMethods: {
            associate: function (models) {

            }
        }
    });
};