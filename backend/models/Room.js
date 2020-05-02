module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define('Room', {
        RoomNumber : {
            type : DataTypes.INTEGER
        },
        Floor : {
            type: DataTypes.INTEGER
        },
        PostNumber : {
            type: DataTypes.STRING
        },
        Detail : {
            type: DataTypes.STRING
        },
        Status: {
            type: DataTypes.STRING
        },
        PostOwnerName: {
            type: DataTypes.STRING
        },
        DateReceive: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        },
        DateComplete: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        }


    });

    return Room;
}