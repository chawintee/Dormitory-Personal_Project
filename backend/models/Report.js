module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define('Report', {
        Topic: {
            type: DataTypes.STRING,
        },
        Detail: {
            type: DataTypes.STRING,
        },
        Status: {
            type: DataTypes.STRING,
        },
        CreateDate: {
            type: DataTypes.DATE,
        },
        CompleteDate: {
            type: DataTypes.DATE,
        }

    });

    Report.associate = models => {
        Report.belongsTo(models.Room);
    }


    return Report;
}