module.exports = (sequelize, DataTypes) => {
    const MonthlyValue = sequelize.define('MonthlyValue', {
        Year: {
            type: DataTypes.INTEGER,
        },
        Month: {
            type: DataTypes.STRING,
        },
        WaterMeter: {
            type: DataTypes.INTEGER,
        },
        WaterPricePerUnit: {
            type: DataTypes.INTEGER,
        },
        WaterPrice: {
            type: DataTypes.INTEGER,
        },
        ElectricityMeter: {
            type: DataTypes.INTEGER,
        },
        ElectricityPricePerUnit: {
            type: DataTypes.INTEGER,
        },
        ElectricityPrice: {
            type: DataTypes.INTEGER,
        },
        RentPrice: {
            type: DataTypes.INTEGER,
        },
        TotalRentPrice: {
            type: DataTypes.INTEGER,
        },
        PaidStatus: {
            type: DataTypes.BOOLEAN,
        },
        PaidDate: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW,
        }
    })

    MonthlyValue.associate = models => {
        MonthlyValue.belongsTo(models.Room)
    }


    return MonthlyValue
}