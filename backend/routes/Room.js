const express = require('express');
const router = express.Router();
const roomController = require('../controllers/Room');

router.post('/createRoom',roomController.createRoom);
router.get('/getRoomByLessonId/:LessonId',roomController.getRoomByLessonId)





module.exports = router;