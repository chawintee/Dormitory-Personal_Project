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
    const roomInput = await db.Room.create({ RoomNumber, Floor, LessonId});
    const LiveInInput = await db.LiveIn.create({Status, DateCheckIn, OccupantId,RoomId:roomInput.id});
    res.status(201).send({ result: roomInput ,result1: LiveInInput })
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


const getRoomLiveInOccupantDataByLessonId = async (req,res) => {
    const LessonId = req.params.LessonId;
    // const room = await db.Room.findAll({ where: { LessonId : LessonId}, include: [models:] });
    try{
        const RoomByLessonId = await db.Room.findAll({where: {LessonId: LessonId}});
        const RoomId = RoomByLessonId.map(ele => ele.id);
        const LiveIn = await db.LiveIn.findAll({where: {RoomId: RoomId.map(item=>item)}});
        const OccupantId = LiveIn.map(ele=>ele.OccupantId);
        const OccupantData = await db.Occupant.findAll({where: {id: OccupantId.map(item=>item)}})

        // const LiveInByRoomId = await db.Room.findAll({where: {RoomId: RoomByLessonId.id}})
        // const RoomOccupantDataByLessonId = await db.Room.findAll({where: {LessonId: LessonId}, include:[{models:db.LiveIn.findAll({where:{RoomId:RoomId}})}]})
        // const RoomOccupantDataByLessonId = await db.Room.findAll({where: {LessonId: LessonId}, include:[{models:db.LiveIn.findAll({where:{RoomId:RoomId}}), include: [{models: db.Occupant.findAll({where: {OccupantId: OccupantId}})}]}]})
        res.status(200).send({result: RoomByLessonId,result1 : RoomId ,result2: LiveIn,result3: OccupantId, result4: OccupantData, message: "OK"});
        // res.status(200).send({result: RoomByLessonId,result1: LiveInByRoomId , message: "OK"})
    } catch {
        res.status(400).send({message: "can't seach"})
    }
}




module.exports = { createRoom, getRoomByLessonId, getRoomLiveInOccupantDataByLessonId }