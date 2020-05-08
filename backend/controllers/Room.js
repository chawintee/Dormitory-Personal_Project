const db = require('../models');

const createRoom =async (req,res) => {
    const RoomNumber = req.body.RoomNumber;
    const Floor = req.body.Floor;
    const LessonId = req.body.LessonId;

    await db.Room.create({
        RoomNumber,
        Floor,
        LessonId,
    })

    res.status(201).send("Room created")
}

const getRoomByLessonId = async (req,res) => {
    const LessonId = req.params.LessonId;
    const result = await db.Room.findAll({where: {LessonId:LessonId}});
    res.status(200).send();
}



module.exports = {createRoom,getRoomByLessonId}