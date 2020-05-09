const db = require('../models');

const createMonthlyValue = async (req, res) => {

    const Year = req.body.Year;
    const Month = req.body.Month;
    const WaterMeter = req.body.WaterMeter;
    let WaterPricePerUnit = req.body.WaterPricePerUnit;
    let WaterPrice = req.body.WaterPrice;
    const ElectricityMeter = req.body.ElectricityMeter;
    let ElectricityPricePerUnit = req.body.ElectricityPricePerUnit;
    let ElectricityPrice = req.body.ElectricityPrice;
    let RentPrice = req.body.RentPrice;
    let TotalRentPrice = req.body.TotalRentPrice;
    const PaidStatus = req.body.PaidStatus;
    const PaidDate = req.body.PaidDate;
    const RoomId = req.body.RoomId


    const room = await db.MonthlyValue.findOne({ where: { Year:Year, Month:Month } });
    console.log(room)
    res.send(`${Year}         ${Month}`)

    // if (room) {
    //     res.status(400).send({ message: "already have data" })
    // } else {

    //     // const lastMonthData = await db.MonthlyValue.fineOne({ where: { Year, Month: (Month - 1), RoomId } });
    //     // let lastMonthElectricityMeter = Number(lastMonthData.ElectricityMeter);
    //     // let lastMonthWaterMeter = Number(lastMonthData.WaterMeter);
    //     // RentPrice = Number(lastMonthData.RentPrice);
    //     // WaterPricePerUnit = Number(lastMonthData.WaterPricePerUnit);
    //     // ElectricityPricePerUnit = Number(lastMonthData.ElectricityPricePerUnit);
    //     // if (!lastMonthData) {
    //     //     lastMonthElectricityMeter = 0;
    //     //     lastMonthWaterMeter = 0;
    //     //     WaterPrice = (WaterMeter - lastMonthWaterMeter) * WaterPricePerUnit;
    //     //     ElectricityPrice = (ElectricityMeter - lastMonthElectricityMeter) * ElectricityPricePerUnit
    //     // } else {
    //     //     WaterPrice = (WaterMeter - lastMonthWaterMeter) * WaterPricePerUnit;
    //     //     ElectricityPrice = (ElectricityMeter - lastMonthElectricityMeter) * ElectricityPricePerUnit
    //     // }
    //     // TotalRentPrice = RentPrice + WaterPrice + ElectricityPrice;



    //     WaterPrice = (WaterMeter) * WaterPricePerUnit;
    //     ElectricityPrice = (ElectricityMeter) * ElectricityPricePerUnit
    //     TotalRentPrice = RentPrice + WaterPrice + ElectricityPrice;
    //     await db.MonthlyValue.create({
    //         Year,
    //         Month,
    //         WaterMeter,
    //         WaterPricePerUnit,
    //         WaterPrice,
    //         ElectricityMeter,
    //         ElectricityPricePerUnit,
    //         ElectricityPrice,
    //         RentPrice,
    //         TotalRentPrice,
    //         PaidStatus,
    //         PaidDate,
    //         RoomId,
    //     })
    //     res.status(201).send({ message: "Data created" });
    // }

    // res.send(Year)

}






module.exports = { createMonthlyValue, }