const express = require('express');
const router = express.Router();
const MonthlyValueController = require('../controllers/MonthlyValue');

router.post('/createMonthlyValue',MonthlyValueController.createMonthlyValue)
router.get('/getMonthlyValue/:RoomId',MonthlyValueController.getMonthlyValue)
router.patch('/editSomeValueById',)




module.exports = router;