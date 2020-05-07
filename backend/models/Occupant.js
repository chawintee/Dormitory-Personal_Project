module.exports = (sequelize, DataTypes) => {
    const Occupant = sequelize.define('Occupant', {
        UserName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        Password: {
            type: DataTypes.STRING,
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
        }
    });

    Occupant.associate = models => {
        Occupant.belongsToMany(models.Room, { through: models.LiveIn })
    }

    return Occupant
}