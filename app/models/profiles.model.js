module.exports = (sequelize, Sequelize) => {
    const Profiles = sequelize.define("profiles", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.CHAR(128)
        },
        description: {
            type: Sequelize.STRING
        },
        userCreated: {
            type: Sequelize.INTEGER
        },
        userUpdated: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.INTEGER
        }
    });
    return Profiles;
};