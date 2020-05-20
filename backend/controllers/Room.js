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

    const roomInput = await db.Room.create({ RoomNumber, Floor, LessonId, include: [{ model: db.LiveIn.create({Status, DateCheckIn, OccupantId,RoomId}) }] })
    res.status(201).send({ result: roomInput })
}

const getRoomByLessonId = async (req, res) => {
    const LessonId = req.params.LessonId;
    // console.log(LessonId)
    const result = await db.Room.findAll({ where: { LessonId: LessonId } });
    res.status(200).send(result);
}


// const addRoomByAllId = async () => {

// }



module.exports = { createRoom, getRoomByLessonId }