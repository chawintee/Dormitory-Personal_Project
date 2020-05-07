module.exports = (sequelize, DataTypes) => {
    const LiveIn = sequelize.define('LiveIn', {
        Status: {
            type: DataTypes.BOOLEAN,
        },
        DateCheckIn: {
            type: DataTypes.DATE,
        },
        DateCheckOut: {
            type: DataTypes.DATE,
        }
    });
    return LiveIn;
}