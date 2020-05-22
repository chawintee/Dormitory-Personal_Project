const express = require('express');
const router = express.Router();
const roomController = require('../controllers/Room');

router.post('/createRoom',roomController.createRoom);
router.get('/getRoomByLessonId/:LessonId',roomController.getRoomByLessonId)
router.post('/getRoomLiveInOccupantDataByLessonId/:LessonId',roomController.getRoomLiveInOccupantDataByLessonId)




module.exports = router;