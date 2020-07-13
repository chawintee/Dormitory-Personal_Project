const express = require('express');
const router = express.Router();
const LessorController = require('../controllers/Lesson');
const passport = require('passport');

const authOccupant = passport.authenticate('jwt-authentication-occupant', { session: false });
const authLessor = passport.authenticate('jwt-authentication-lessor', { session: false });
let auth;
if (authLessor) {
    auth = passport.authenticate('jwt-authentication-lessor', { session: false });
}
if (authOccupant) {
    auth = passport.authenticate('jwt-authentication-occupant', { session: false });
}

router.post('/Register', LessorController.register);
router.post('/Login', LessorController.login);
router.post('/checkUsername', LessorController.checkUsername);
router.get('/get/:id',authLessor, LessorController.get);
router.get('/data/:occupantId', auth, LessorController.getLessonDataByOccupantId)


module.exports = router;