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


    // console.log(room)
    // res.send(room)

    if (!RoomId) {
        res.status(400).send({ message: "Please Enter RoomId" })
    } else {
        const room = await db.MonthlyValue.findOne({ where: { Year: Year, Month: Month, RoomId: RoomId } });

        if (room) {
            res.status(400).send({ message: "already have data" })
        }
        else {

            let lastMonth = Number(Month - 1);
            // console.log(lastMonth)
            let lastYear;
            let lastMonthData;
            // res.send(String(lastMonth));
            if (lastMonth<=0) {
                lastYear = Number(Year - 1);
                // console.log(lastYear)
                lastMonth = 12;
                // console.log(lastMonth)
                // res.send(String(lastYear));
                lastMonthData = await db.MonthlyValue.findOne({ where: { Year: lastYear, Month: lastMonth, RoomId: RoomId } });
            }else{
                // console.log(Year)
                // console.log(lastMonth)
                // res.send(String(lastMonth));
                lastMonthData = await db.MonthlyValue.findOne({ where: { Year: Year, Month: lastMonth, RoomId: RoomId } });
            }

            console.log('_______________________________________________________________________________________________________________________________________')

            if (!lastMonthData) {

                res.status(400).send({ message: "Please Enter your initial data" })
                // console.log("Don't have lastMonth Data")
                // const lastMonthElectricityMeter = 0;
                // const lastMonthWaterMeter = 0;
                // RentPrice = Number(lastMonthData.RentPrice);
                // WaterPrice = (WaterMeter - lastMonthWaterMeter) * WaterPricePerUnit;
                // ElectricityPrice = (ElectricityMeter - lastMonthElectricityMeter) * ElectricityPricePerUnit

            } else {

                console.log("Have lastMonth Data")
                let lastMonthElectricityMeter = Number(lastMonthData.ElectricityMeter);
                console.log(`lastMonthElectricityMeter: ${lastMonthElectricityMeter}`)
                let lastMonthWaterMeter = Number(lastMonthData.WaterMeter);
                console.log(`lastMonthWaterMeter: ${lastMonthWaterMeter}`)
                RentPrice = Number(lastMonthData.RentPrice);
                console.log(`RentPrice: ${RentPrice}`)

                WaterPricePerUnit = Number(lastMonthData.WaterPricePerUnit);
                console.log(`WaterPricePerUnit: ${WaterPricePerUnit}`)
                ElectricityPricePerUnit = Number(lastMonthData.ElectricityPricePerUnit);
                console.log(`ElectricityPricePerUnit: ${ElectricityPricePerUnit}`)

                WaterPrice = (WaterMeter - lastMonthWaterMeter) * WaterPricePerUnit;
                console.log(`WaterPrice: ${WaterPrice}`)
                ElectricityPrice = (ElectricityMeter - lastMonthElectricityMeter) * ElectricityPricePerUnit
                console.log(`ElectricityPrice: ${ElectricityPrice}`)
            }

            TotalRentPrice = Number(RentPrice) + Number(WaterPrice) + Number(ElectricityPrice);
            console.log(TotalRentPrice)

            await db.MonthlyValue.create({
                Year,
                Month,
                WaterMeter,
                WaterPricePerUnit,
                WaterPrice,
                ElectricityMeter,
                ElectricityPricePerUnit,
                ElectricityPrice,
                RentPrice,
                TotalRentPrice,
                PaidStatus: false,
                PaidDate,
                RoomId,
            })

            res.status(201).send({ message: "Data crated" });
        }
    }
    // res.send(Year)
}




const getMonthlyValue = async (req, res) => {
    const RoomId = req.params.RoomId;
    console.log(RoomId)
    const result = await db.MonthlyValue.findAll({ where: { RoomId: RoomId } })
    res.status(200).send(result)
    // console.log(result)
    // const now1 = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    // const now1 = new Date()
    // const now1 = new Date().toJSON()
    // const now1 = new Date().toJSON().slice(0, 10)
    // const now1 = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    // const currentDate = new Date();
    // const day = currentDate.getDate();
    // const month = currentDate.getMonth() + 1;
    // const year = currentDate.getFullYear();
    // console.log(currentDate)
    // console.log(day)
    // console.log(month)
    // console.log(year)
    // console.log(now1)
}




const editMonthlyValueById = async (req, res) => {
    const id = req.params.id;
    const WaterMeter = req.body.WaterMeter;
    const ElectricityMeter = req.body.ElectricityMeter;
    const RentPrice = req.body.RentPrice;
    const PaidStatus = req.body.PaidStatus;
    const PaidDate = req.body.PaidDate;

    const dataOfId = await db.MonthlyValue.findOne({ where: { id: id } });
    const inThisYear = dataOfId.Year;
    const inThisMonth = dataOfId.Month;
    const inThisRoomId = dataOfId.RoomId;
    let lastMonth = (inThisMonth - 1);
    if (lastMonth <= 0) {
        const lastYear = inThisYear - 1;
        lastMonth = 12;
        const lastMonthDataOfId = await db.MonthlyValue.findOne({ where: { Year: inThisYear, Month: lastMonth, RoomId: inThisRoomId } });
    } else {
        const lastMonthDataOfId = await db.MonthlyValue.findOne({ where: { Year: inThisYear, Month: lastMonth, RoomId: inThisRoomId } });
    }






    console.log(dataOfId.Month)
    console.log(lastMonthDataOfId.Month)
    res.send(lastMonthDataOfId)
    // if (WaterMeter) {

    // }






    // await db.MonthlyValue.update(
    //     {
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
    //     },
    //     { where: { id: id } }
    // );


    // res.status(200).send({ message: "Data updated" })


}












module.exports = { createMonthlyValue, getMonthlyValue, editMonthlyValueById }