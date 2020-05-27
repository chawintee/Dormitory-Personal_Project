const db = require('../models');

const initialMonthlyValue = async (req, res) => {
    const Month = req.body.Month;
    const Year = req.body.Year;
    const RoomId = req.body.RoomId;

    try {
        const filters = { RoomId: RoomId }
        if (Month) {
            filters['Month'] = Month;
        }
        if (Year) {
            filters['Year'] = Year;
        }


        const user = await db.MonthlyValue.findOne({ where: filters })
        console.log(user)
        if(!user){
            await db.MonthlyValue.create({
                Year,
                Month,
                RoomId,
            })
            
            res.status(200).send({message : "should create",user})
        }
        if(user){
            res.status(400).send("already created")
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Not OK" })
    }


}














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
            if (lastMonth <= 0) {
                lastYear = Number(Year - 1);
                // console.log(lastYear)
                lastMonth = 12;
                // console.log(lastMonth)
                // res.send(String(lastYear));
                lastMonthData = await db.MonthlyValue.findOne({ where: { Year: lastYear, Month: lastMonth, RoomId: RoomId } });
            } else {
                // console.log(Year)
                // console.log(lastMonth)
                // res.send(String(lastMonth));
                lastMonthData = await db.MonthlyValue.findOne({ where: { Year: Year, Month: lastMonth, RoomId: RoomId } });
            }

            // console.log('_______________________________________________________________________________________________________________________________________')

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
    let RentPrice = req.body.RentPrice;
    const PaidStatus = req.body.PaidStatus;
    const PaidDate = req.body.PaidDate;
    let WaterPrice;
    let ElectricityPrice;
    let WaterPricePerUnit = req.body.WaterPricePerUnit;
    let ElectricityPricePerUnit = req.body.ElectricityPricePerUnit;


    const dataOfId = await db.MonthlyValue.findOne({ where: { id: id } });
    const inThisYear = dataOfId.Year;
    const inThisMonth = dataOfId.Month;
    const inThisRoomId = dataOfId.RoomId;
    let lastMonth = (inThisMonth - 1);
    let lastYear;
    let lastMonthDataOfId;
    if (lastMonth <= 0) {
        lastYear = inThisYear - 1;
        lastMonth = 12;
        lastMonthDataOfId = await db.MonthlyValue.findOne({ where: { Year: lastYear, Month: lastMonth, RoomId: inThisRoomId } });
    } else {
        lastMonthDataOfId = await db.MonthlyValue.findOne({ where: { Year: inThisYear, Month: lastMonth, RoomId: inThisRoomId } });
    }
    // console.log(dataOfId.Month)
    // console.log(dataOfId.Year)
    // console.log(lastMonthDataOfId.Month)
    // console.log(lastMonthDataOfId.Year)
    // res.send(dataOfId)


    WaterPrice = dataOfId.WaterPrice
    ElectricityPrice = dataOfId.ElectricityPrice;
    if (!RentPrice) {
        RentPrice = dataOfId.RentPrice;
    }
    if (!WaterPricePerUnit) {
        WaterPricePerUnit = dataOfId.WaterPricePerUnit
    }
    if (!ElectricityPricePerUnit) {
        ElectricityPricePerUnit = dataOfId.ElectricityPricePerUnit
    }
    if (WaterMeter) {
        WaterPrice = (Number(WaterMeter) - Number(lastMonthDataOfId.WaterMeter)) * Number(WaterPricePerUnit);
        // console.log(WaterPrice);
    }
    if (ElectricityMeter) {
        ElectricityPrice = (Number(ElectricityMeter) - Number(lastMonthDataOfId.ElectricityMeter)) * Number(ElectricityPricePerUnit);
    }

    const TotalRentPrice = Number(RentPrice) + Number(WaterPrice) + Number(ElectricityPrice);

    // res.send(String(TotalRentPrice));

    await db.MonthlyValue.update(
        {
            WaterMeter,
            WaterPricePerUnit,
            WaterPrice,
            ElectricityMeter,
            ElectricityPricePerUnit,
            ElectricityPrice,
            RentPrice,
            TotalRentPrice,
            PaidStatus,
            PaidDate,
        },
        { where: { id: id } }
    );
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
    res.status(200).send({ message: "Data updated" })
}












module.exports = { createMonthlyValue, getMonthlyValue, editMonthlyValueById, initialMonthlyValue }