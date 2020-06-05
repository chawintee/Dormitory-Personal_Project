const db = require('../models');

const createRoom = async (req, res) => {
    const RoomNumber = req.body.RoomNumber;
    const Floor = req.body.Floor;
    const LessonId = req.body.LessonId;
    const Status = req.body.Status;
    // const DateCheckIn = req.body.DateCheckIn;
    const DateCheckIn = new Date();
    const OccupantId = req.body.OccupantId;
    const RoomId = req.body.RoomId;
    console.log(RoomNumber);
    // const room = await db.Room.findOne({ where: { RoomNumber: RoomNumber, LessonId : LessonId} });
    // res.send(room)

    // if (room) {
    //     res.status(400).send({ message: "Room already token" })
    // } else {
    //     await db.Room.create({
    //         RoomNumber,
    //         Floor,
    //         LessonId,
    //     })
    //     res.status(201).send({ message: "Room created" })
    // }

    // const roomInput = await db.Room.create({ RoomNumber, Floor, LessonId, include: [{ model: db.LiveIn.create({Status, DateCheckIn, OccupantId,RoomId}) }] })
    const roomInput = await db.Room.create({ RoomNumber, Floor, LessonId });
    const LiveInInput = await db.LiveIn.create({ Status, DateCheckIn, OccupantId, RoomId: roomInput.id });
    res.status(201).send({ result: roomInput, result1: LiveInInput })
    // if(roomInput){
    //     const LiveInInput = await db.LiveIn.create({Status, DateCheckIn, OccupantId,RoomId:roomInput.id});
    //     res.status(201).send({ result: roomInput ,result1: LiveInInput })
    // }
}

const getRoomByLessonId = async (req, res) => {
    const LessonId = req.params.LessonId;
    // console.log(LessonId)
    const result = await db.Room.findAll({ where: { LessonId: LessonId } });
    res.status(200).send(result);
}


const getRoomLiveInOccupantDataByLessonId = async (req, res) => {
    const LessonId = req.params.LessonId;
    const Status = req.body.Status;
    const Floor = req.body.Floor;
    try {
        const filters = { LessonId: LessonId }
        if (Floor) {
            filters['Floor'] = Floor
        }
        if (Status) {
            filters['$Occupants->LiveIn.Status$'] = Status === 'true' || Status ==='1'
        }

        const OccupantRoomData = await db.Room.findAll({ where: filters, include: [{ model: db.Occupant }] })
        res.status(200).send({ OccupantRoomData, length: OccupantRoomData.length, message: "OK" });

    } catch (e) {
        console.log(e);
        res.status(400).send({ message: "can't search" })
    }
}



const getFloorByLessonId = async (req,res) => {
    const Lesson = req.params.LessonId;
    const Floor = req.body.Floor;
    const Status = req.body.Status;
    console.log(Floor)
    const filters = {LessonId: Lesson};
    // filters['Floor'] = Floor;
    if(Floor){
        filters['Floor'] = Floor;
    }
    if(Status){
        filters['$Occupants->LiveIn.Status$'] = Status == "true" || Status === '1' ;
    }

    console.log(filters)
    console.log("----------------------------------------------------------------------------------------------------------------------------------------")

    try{
        // const roomFloor = await db.Room.findAll({where: filters, include:[{model: db.Occupant }]})
        const roomFloor = await db.Room.findAll({where: filters, include:[{model: db.Occupant }]}).map(ele=> ele.Floor)
        const setRoomFloor =[...new Set(roomFloor)]
        // console.log(roomFloor)
        res.send({roomFloor:roomFloor,setRoomFloor:setRoomFloor ,LengthRoomFloor: roomFloor.length})
        // res.send({setRoomFloor:setRoomFloor })
    } catch (error) {
        console.log(error)
        res.send({Message: "Error"})
    }
}



module.exports = { createRoom, getRoomByLessonId, getRoomLiveInOccupantDataByLessonId, getFloorByLessonId }