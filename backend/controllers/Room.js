const db = require('../models');

const createRoom = async (req, res) => {
    const RoomNumber = req.body.RoomNumber;
    const Floor = req.body.Floor;
    const LessonId = req.body.LessonId;
    console.log(RoomNumber);
    const room = await db.Room.findOne({ where: { RoomNumber: RoomNumber, LessonId } });
    // res.send(room)

    if (room) {
        res.status(400).send({ message: "Room already token" })
    } else {
        await db.Room.create({
            RoomNumber,
            Floor,
            LessonId,
        })
        res.status(201).send({ message: "Room created" })
    }
}

const getRoomByLessonId = async (req, res) => {
    const LessonId = req.params.LessonId;
    // console.log(LessonId)
    const result = await db.Room.findAll({ where: { LessonId: LessonId } });
    res.status(200).send(result);
}



module.exports = { createRoom, getRoomByLessonId }