const express = require('express')
const router = express.Router();
const LiveInController = require('../controllers/LiveIn')

router.patch('/editStatusAndCheckoutByRoomId/:RoomId',LiveInController.editStatusAndCheckoutByRoomId),






module.exports = router;