const db = require('../models');

const editStatusAndCheckoutByRoomId = async (req, res) => {
    const RoomId = req.params.RoomId;
    const OccupantId = req.body.OccupantId;
    const Status = req.body.Status;
    const DateCheckOut = new Date();

    try {
        const updateLiveIn = await db.LiveIn.update({ Status: Status, DateCheckOut: DateCheckOut }, { where: { RoomId: RoomId, OccupantId: OccupantId } })
        if (updateLiveIn == 1) {
            res.status(200).send({ result: updateLiveIn, message: "Can update" });
        } else {
            res.status(400).send({ message: "can't update Data" })
        }
    } catch {
        res.status(400).send({ message: "can't update Data" })
    }
}







module.exports = { editStatusAndCheckoutByRoomId }