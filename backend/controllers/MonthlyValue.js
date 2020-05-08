const db = require('../models/MonthlyValue');

const createMonthlyValue = (req, res) => {

    const Year = req.body.Year;
    const Month = req.body.Month;
    const WaterMeter = req.body.WaterMeter;
    const WaterPricePerUnit = req.body.WaterPricePerUnit;
    const WaterPrice = req.body.WaterPrice;
    const ElectricityMeter = req.body.ElectricityMeter;
    const ElectricityPricePerUnit = req.body.ElectricityPricePerUnit;
    const ElectricityPrice = req.body.ElectricityPrice;
    const RentPrice = req.body.RentPrice;
    const TotalRentPrice = req.body.TotalRentPrice;
    const PaidStatus = req.body.PaidStatus;
    const PaidDate = req.body.PaidDate;

    res.send(Year)

}






module.exports = { createMonthlyValue, }