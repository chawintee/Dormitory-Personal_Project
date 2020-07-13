const express = require('express');
const router = express.Router();
const LessonController = require('../controllers/Lesson');
const passport = require('passport');

const authLessor = passport.authenticate('jwt-authentication-occupant', { session: false });
const authOccupant = passport.authenticate('jwt-authentication-lessor', { session: false });
let auth;
if (authLessor) {
    auth = passport.authenticate('jwt-authentication-lessor', { session: false });
}
if (authOccupant) {
    auth = passport.authenticate('jwt-authentication-occupant', { session: false });
}

router.post('/Register', LessonController.registerLesson);
router.post('/Login', LessonController.loginLesson);
router.post('/checkUsername', LessonController.checkUsername);
router.get('/getLessonById/:id', LessonController.getLessonById);
router.get('/data/:occupantId', auth, LessonController.getLessonDataByOccupantId)


module.exports = router;