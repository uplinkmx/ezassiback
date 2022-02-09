module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.CHAR(45)
        },
        password: {
            type: Sequelize.STRING
        },
        perfil_id: {
            type: Sequelize.INTEGER
        },
        mail: {
            type: Sequelize.CHAR(128)
        },
        phone: {
            type: Sequelize.CHAR(128)
        },
        status: {
            type: Sequelize.INTEGER
        },
        userCreated: {
            type: Sequelize.INTEGER
        },
        userUpdated: {
            type: Sequelize.INTEGER
        },
        token: {
            type: Sequelize.STRING
        },
        token_expiracion: {
            type: Sequelize.DATE
        }
    });
    return Users;
};