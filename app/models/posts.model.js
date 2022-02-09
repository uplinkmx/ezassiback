module.exports = (sequelize, Sequelize) => {
    const Posts = sequelize.define("posts", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.CHAR(255)
        },
        content: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.CHAR(255)
        },
        postedby: {
            type: Sequelize.CHAR(128)
        },
        assigness: {
            type: Sequelize.CHAR(128)
        },
        workflow: {
            type: Sequelize.CHAR(128)
        },
        reviewscore: {
            type: Sequelize.DOUBLE
        },
        isactive: {
            type: Sequelize.INTEGER
        },
    });
    return Posts;
};