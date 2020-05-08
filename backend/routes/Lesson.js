const express = require('express');
const router = express.Router();
const LessonController = require('../controllers/Lesson')


router.post('/Register',LessonController.registerLesson)
router.post('/Login',LessonController.loginLesson)



module.exports = router;