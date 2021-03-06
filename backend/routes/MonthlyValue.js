const express = require('express');
const router = express.Router();
const MonthlyValueController = require('../controllers/MonthlyValue');

router.post('/createMonthlyValue',MonthlyValueController.createMonthlyValue)
router.get('/getMonthlyValue/:RoomId',MonthlyValueController.getMonthlyValue)
router.patch('/editSomeValue/:id',MonthlyValueController.editMonthlyValueById)
router.post('/initialCreate/:LessonId', MonthlyValueController.initialMonthlyValue)
router.post('/getMonthlyValueByLessonId/:LessonId', MonthlyValueController.getMonthlyValueByLessonId)
router.delete('/deleteByYearMonthLessonId/:LessonId',MonthlyValueController.deleteMonthlyValueByYearMonthLessonId)
router.post('/getMonthlyValueAndLastMonthlyValueByLessonId/:LessonId',MonthlyValueController.getMonthlyValueAndLastMonthlyValueByLessonId)
router.post('/getMonthlyValueDataByYearMonthOccupantId/:occupantId',MonthlyValueController.getMonthlyValueByYearMonthOccupantId)


module.exports = router;