module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define('Room', {
        RoomNumber : {
            type : DataTypes.INTEGER
        },
        Floor : {
            type: DataTypes.INTEGER
        }

    });

        Room.associate = models => {
            Room.belongsTo(models.Lesson)
            Room.hasMany(models.MonthlyValue)
            Room.hasMany(models.Post)
            Room.hasMany(models.Report)
            Room.belongsToMany(models.Occupant, {through : models.LiveIn})
        }

    return Room;
}