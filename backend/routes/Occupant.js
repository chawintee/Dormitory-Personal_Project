const express = require('express');
const router = express.Router();
const occupantController = require('../controllers/Occupant');
const passport = require('passport');

const authOccupant = passport.authenticate('jwt-authentication-occupant', { session: false });
const authLessor = passport.authenticate('jwt-authentication-lessor', { session: false });

let auth ;

if (authLessor) {
    auth = passport.authenticate('jwt-authentication-lessor', { session: false });
}
if (authOccupant) {
    auth = passport.authenticate('jwt-authentication-occupant', { session: false });
}

router.post('/register', occupantController.register)
router.post('/login', occupantController.login)
router.get('/get/:id', auth, occupantController.get)
router.post('/checkUsername', occupantController.checkUsername)

module.exports = router;