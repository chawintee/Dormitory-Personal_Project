module.exports = (sequelize, DataTypes) => {
    const Lesson = sequelize.define('Lesson', {
        Username: {
            type: DataTypes.STRING,
            // allowNull: false,
            // unique: true,
        },
        Password: {
            type: DataTypes.STRING(1000),
        },
        Name: {
            type: DataTypes.STRING,
        },
        Surname: {
            type: DataTypes.STRING,
        },
        Mobile: {
            type: DataTypes.INTEGER,
        },
        Address: {
            type: DataTypes.STRING,
        },
        Photo: {
            type: DataTypes.STRING,
        },
        DormitoryPhone: {
            type: DataTypes.INTEGER,
        },
        DormitoryName: {
            type: DataTypes.STRING,
        },
        Province: {
            type: DataTypes.STRING,
        },
        PostCode: {
            type: DataTypes.INTEGER,
        },
        BookAccount: {
            type: DataTypes.INTEGER,
        }
    });

    Lesson.associate = models => {
        Lesson.hasMany(models.Room)
    }

    return Lesson

}