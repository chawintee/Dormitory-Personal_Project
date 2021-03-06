const db = require('../models');

const initialMonthlyValue = async (req, res) => {
    console.log("--------------------------------------------------------------------------------------------------------------------------")

    const LessonId = req.params.LessonId;

    const Month = req.body.Month;
    const Year = req.body.Year;
    const RoomId = req.body.RoomId;
    const PaidStatus = false;
    const WaterPricePerUnit = req.body.WaterPricePerUnit;
    const ElectricityPricePerUnit = req.body.ElectricityPricePerUnit;
    const RentPrice = req.body.RentPrice;



    const filters = { Year: Year }
    if (Month) {
        filters['Month'] = Month;
    }

    const value = { Year: Year, PaidStatus: PaidStatus }
    if (Month) {
        value['Month'] = Month;
    }
    if (WaterPricePerUnit) {
        value['WaterPricePerUnit'] = WaterPricePerUnit;
    }
    if (ElectricityPricePerUnit) {
        value['ElectricityPricePerUnit'] = ElectricityPricePerUnit;
    }
    if (RentPrice) {
        value['RentPrice'] = RentPrice;
    }





    // console.log(value)

    const RoomDataByMonthlyValueLessonId = await db.MonthlyValue.findAll({ where: filters, include: [{ model: db.Room, where: { LessonId: LessonId } }] })
    // console.log(Boolean(RoomDataByMonthlyValueLessonId))
    // console.log(Boolean(RoomDataByMonthlyValueLessonId.length))
    // res.send({result: RoomDataByMonthlyValueLessonId})
    if (RoomDataByMonthlyValueLessonId && RoomDataByMonthlyValueLessonId.length) {
        const RoomIdByRoomDataByMonthlyValueLessonId = RoomDataByMonthlyValueLessonId.map(item => item.RoomId)
        const RoomIdByRoom = await db.Room.findAll({ where: { LessonId: LessonId } }).map(item => item.id)
        for (let i = 0; i < RoomIdByRoomDataByMonthlyValueLessonId.length; i++) {
            index = RoomIdByRoom.indexOf(RoomIdByRoomDataByMonthlyValueLessonId[i])
            // console.log(index)
            if (index > -1) {
                RoomIdByRoom.splice(index, 1);
            }
        }
        // console.log(RoomIdByRoom)
        const createMonthlyValueIfNotSame = RoomIdByRoom.map(item => db.MonthlyValue.create({ ...value, RoomId: item }))
        res.status(201).send({ result: RoomDataByMonthlyValueLessonId, RoomIdByRoomData: RoomIdByRoomDataByMonthlyValueLessonId, RoomIdByRoom: RoomIdByRoom, createMonthlyValueIfNotSame: createMonthlyValueIfNotSame, message: "Have Data" })

    }
    if (RoomDataByMonthlyValueLessonId === undefined || RoomDataByMonthlyValueLessonId.length == 0) {
        console.log("In Don't Have Data Loop")
        ///////////////create Room if not have Data ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const filters2 = { LessonId: LessonId }
        filters2['$Occupants->LiveIn.Status$'] = true
        const RoomIdByYearMonthLessonId = await db.Room.findAll({ where: filters2, include: [{ model: db.Occupant }] })
        // console.log({ Year, Month, PaidStatus })
        const createMonthlyValue = await RoomIdByYearMonthLessonId.map(item => db.MonthlyValue.create({ ...value, RoomId: item.id }))
        // res.send({RoomIdOK:RoomIdOKK}) 
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        res.status(201).send({ RoomIdOK: createMonthlyValue, message: "Don't have Data" })
    }
}



const getMonthlyValueByLessonId = async (req, res) => {
    // console.log("TestGetMonthlyValueByLessonId OK")
    const LessonId = req.params.LessonId;
    const Year = req.body.Year;
    const Month = req.body.Month;
    const Floor = req.body.Floor;
    const filters = { Year: Year };
    filters['Month'] = Month;
    filters['$Room.LessonId$'] = LessonId;
    filters['$Room->Occupants->LiveIn.Status$'] = true;
    if(Floor){
        filters['$Room.Floor$'] = Floor;
    }

    try {
        console.log("-------------------------------------------------------------------------------------------------------------------------------------")
        const MonthlyValueByLessonId = await db.MonthlyValue.findAll({ where: filters, include: [{ model: db.Room, include: [{ model: db.Occupant }] }]})
        res.send({ MonthlyValueByLessonId: MonthlyValueByLessonId, length: MonthlyValueByLessonId.length })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}


const getMonthlyValueAndLastMonthlyValueByLessonId = async (req, res) => {
    // console.log("TestGetMonthlyValueByLessonId OK")
    const LessonId = req.params.LessonId;
    const Year = req.body.Year;
    const Month = req.body.Month;
    const filters = { Year: Year };
    filters['Month'] = Month;
    filters['$Room.LessonId$'] = LessonId;
    filters['$Room->Occupants->LiveIn.Status$'] = true;

    let lastMonth;
    let lastYear;

    if (Month == 1) {
        lastMonth = 12
        lastYear = Year - 1;
    } else {
        lastYear = Year;
        lastMonth = Month - 1;
    }

    const lastMonthFilter = { Year: lastYear }
    lastMonthFilter['Month'] = lastMonth;
    lastMonthFilter['$Room.LessonId$'] = LessonId;
    lastMonthFilter['$Room->Occupants->LiveIn.Status$'] = true;



    try {
        console.log("-------------------------------------------------------------------------------------------------------------------------------------")
        const MonthlyValueByLessonId = await db.MonthlyValue.findAll({ where: filters, include: [{ model: db.Room, include: [{ model: db.Occupant }] }] })
        const lastMonthlyValueByLessonId = await db.MonthlyValue.findAll({ where: lastMonthFilter, include: [{ model: db.Room, include: [{ model: db.Occupant }] }] })
        const onlyEEMeterAndWaterMeterLastMonth = lastMonthlyValueByLessonId.map(ele => ({ RoomId: ele.RoomId, WaterMeter: ele.WaterMeter, ElectricityMeter: ele.ElectricityMeter }))

        const MonthlyValueAndLastMonthlyValueByLessonId = [];
        MonthlyValueByLessonId.map(
            obj => {
                onlyEEMeterAndWaterMeterLastMonth.map(lastMonthObj => {
                    if (obj.RoomId == lastMonthObj.RoomId) {
                        // console.log(obj.RoomId)
                        // console.log(lastMonthObj.WaterMeter)
                        obj.lastMonthWaterMeter = lastMonthObj.WaterMeter;
                        obj.lastMonthElectricityMeter = lastMonthObj.ElectricityMeter;
                        // console.log(obj)
                        return MonthlyValueAndLastMonthlyValueByLessonId.push(obj)
                    } else { }
                }
                )
            }
        )
        console.log(MonthlyValueAndLastMonthlyValueByLessonId)
        res.send({ MonthlyValueAndLastMonthlyValueByLessonId: MonthlyValueAndLastMonthlyValueByLessonId })

        // res.send({ MonthlyValueByLessonId: MonthlyValueByLessonId, lastMonthlyValueByLessonId: lastMonthlyValueByLessonId, onlyEEMeterAndWaterMeterLastMonth:onlyEEMeterAndWaterMeterLastMonth,MonthlyValueAndLastMonthlyValueByLessonId:MonthlyValueAndLastMonthlyValueByLessonId, length: MonthlyValueByLessonId.length })
        // res.send({MonthlyValueAndLastMonthlyValueByLessonId:MonthlyValueAndLastMonthlyValueByLessonId})
    } catch (error) {
        console.log(error)
        res.send(error)
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
    console.log("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------")
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

    const newEditMonthlyValue = await db.MonthlyValue.findOne({ where: { id: id } })

    res.status(200).send({ newEditMonthlyValue: newEditMonthlyValue })
    // res.status(200).send({ message: "Data updated" ,newEditMonthlyValue:newEditMonthlyValue})

}







const deleteMonthlyValueByYearMonthLessonId = async (req, res) => {
    const LessonId = req.params.LessonId;
    const Year = req.body.Year;
    const Month = req.body.Month;

    const filters = { Year: Year };
    // filters['$Room.LessonId$'] = LessonId;
    filters['Month'] = Month;
    try {
        // const deletedMonthlyValue = await db.MonthlyValue.findAll({where: filters ,include:[{model: db.Room}]})
        const deletedMonthlyValue = await db.MonthlyValue.destroy({ where: filters, include: [{ model: db.Room, where: { LessonId: LessonId } }] })
        res.send({ deletedMonthlyValue: deletedMonthlyValue, Length: deletedMonthlyValue.length })
    } catch (e) {
        console.log(e)
        res.send("error")
    }
}



const getMonthlyValueByYearMonthOccupantId = async (req, res) => {
    const OccupantId = req.params.occupantId;
    const Year = req.body.Year;
    const Month = req.body.Month;
    console.log("----------------------------------------------------------------------------------------------------")
    const filters = {};
    filters['Year'] = Year;
    filters['Month'] = Month;
    filters['$Room->Occupants->LiveIn.Status$'] = 1;
    filters['$Room->Occupants.id$'] = OccupantId;

    try {
        const MonthlyValueData = await db.MonthlyValue.findAll({where:filters, include: [{ model: db.Room, include: [{ model: db.Occupant }] }] });
        const objMonthlyValueData = MonthlyValueData[0];
        res.send({ message: "OK", MonthlyValueData: objMonthlyValueData })
    } catch (e) {
        console.log(e)
        res.send("Error")
    }

}














module.exports =
{
    createMonthlyValue,
    getMonthlyValue,
    editMonthlyValueById,
    initialMonthlyValue,
    getMonthlyValueByLessonId,
    deleteMonthlyValueByYearMonthLessonId,
    getMonthlyValueAndLastMonthlyValueByLessonId,
    getMonthlyValueByYearMonthOccupantId
}