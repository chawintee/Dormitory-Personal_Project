module.exports = (sequelize, DataTypes) => {
    const LiveIn = sequelize.define('LiveIn',{
        Status: {
            type : DataTypes.STRING,
        },
        DateCheckIn : {
            type : DataTypes.DATE,
        },
        DateCheckOut : {
            type : DataTypes.DATE,
        }
    });
    return LiveIn;
}