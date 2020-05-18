const express = require('express');
const router = express.Router();
const LessonController = require('../controllers/Lesson');


router.post('/Register', LessonController.registerLesson);
router.post('/Login', LessonController.loginLesson);
router.post('/checkUsername', LessonController.checkUsername);
router.get('/getLessonById/:id', LessonController.getLessonById);



module.exports = router;