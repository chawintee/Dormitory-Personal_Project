const db = require('../models');

const createRoom = async (req, res) => {
    const RoomNumber = req.body.RoomNumber;
    const Floor = req.body.Floor;
    const LessonId = req.params.LessonId;
    const Status = req.body.Status;
    // const DateCheckIn = req.body.DateCheckIn;
    const DateCheckIn = new Date();
    const OccupantId = req.body.OccupantId;
    const RoomId = req.body.RoomId;
    console.log("----------------------------------------------------------------------------------------------------------------------------------------------------------------------")
    console.log(RoomNumber);

    const roomFilters = { LessonId: LessonId };
    if (RoomNumber) {
        roomFilters['RoomNumber'] = RoomNumber;
    }
    if (Floor) {
        roomFilters['Floor'] = Floor;
    }
    roomFilters['$Occupants->LiveIn.Status$'] = true;

    const occupantFilter = { id: OccupantId };
    occupantFilter['$Rooms->LiveIn.Status$'] = true;

    const roomValue = { RoomNumber: RoomNumber };
    roomValue['Floor'] = Floor;
    roomValue['LessonId'] = LessonId;

    const liveInValue = { Status: true };
    liveInValue['DateCheckIn'] = DateCheckIn;
    liveInValue['OccupantId'] = OccupantId;

    console.log(roomFilters)
    try {
        const roomHaveOccupant = await db.Room.findAll({ where: roomFilters, include: [{ model: db.Occupant }] })
        console.log(Boolean(roomHaveOccupant.length > 0))
        if (roomHaveOccupant.length > 0) {
            res.status(400).send({ message: 'This room have occupant now' })
        }
        if (roomHaveOccupant.length == 0) {
            console.log("Loop-------------------------------------------------------------------------------------------------------------------")
            const occupantHaveRoom = await db.Occupant.findAll({ where: occupantFilter, include: [{ model: db.Room }] })
            if (occupantHaveRoom.length > 0) {
                res.status(400).send({ message: 'This occupant have room now', occupantHaveRoom: occupantHaveRoom })
            }
            if (occupantHaveRoom.length == 0) {
                const roomCreated = await db.Room.create(roomValue)
                const liveInCreated = await db.LiveIn.create({ ...liveInValue, RoomId: roomCreated.id })
                res.status(200).send({ message: "Room and Occupant can create Room", liveInCreated: liveInCreated, roomCreated: roomCreated })
            }
            // res.status(200).send({message: 'This Room can Create',roomHaveOccupant:roomHaveOccupant})
        }
        // res.send({roomHaveOccupant:roomHaveOccupant})
    } catch (error) {
        console.log(error)
        res.send({ message: 'Error' })
    }
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
            filters['$Occupants->LiveIn.Status$'] = Status === 'true' || Status === '1'
        }

        // const OccupantRoomData = await db.Room.findAll({ where: filters, include: [{ model: db.Occupant, attributes: ['id', 'Name','Surname','Mobile','Address','Photo'] }], order: [['Floor', 'ASC'], ['RoomNumber', 'ASC']], attributes: ['RoomNumber', 'Floor'] })
        const OccupantRoomData = await db.Room.findAll({ where: filters, include: [{ model: db.Occupant }], order: [['Floor', 'ASC'], ['RoomNumber', 'ASC']]})
        res.status(200).send({ OccupantRoomData, length: OccupantRoomData.length, message: "OK" });

    } catch (e) {
        console.log(e);
        res.status(400).send({ message: "can't search" })
    }
}



const getFloorByLessonId = async (req, res) => {
    const Lesson = req.params.LessonId;
    const Floor = req.body.Floor;
    const Status = req.body.Status;
    console.log(Floor)
    const filters = { LessonId: Lesson };
    // filters['Floor'] = Floor;
    if (Floor) {
        filters['Floor'] = Floor;
    }
    if (Status) {
        filters['$Occupants->LiveIn.Status$'] = Status == "true" || Status === '1';
    }

    console.log(filters)
    console.log("----------------------------------------------------------------------------------------------------------------------------------------")

    try {
        // const roomFloor = await db.Room.findAll({where: filters, include:[{model: db.Occupant }]})
        const roomFloor = await db.Room.findAll({ where: filters, include: [{ model: db.Occupant }] }).map(ele => ele.Floor)
        const setRoomFloor = [...new Set(roomFloor)]
        // console.log(roomFloor)
        // res.send({roomFloor:roomFloor,setRoomFloor:setRoomFloor ,LengthRoomFloor: roomFloor.length})
        res.send({ setRoomFloor: setRoomFloor })
    } catch (error) {
        console.log(error)
        res.send({ Message: "Error" })
    }
}



module.exports = { createRoom, getRoomByLessonId, getRoomLiveInOccupantDataByLessonId, getFloorByLessonId }