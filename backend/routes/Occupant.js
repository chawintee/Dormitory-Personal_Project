const express = require('express');
const router = express.Router();
const occupantController = require('../controllers/Occupant');
const passport = require('passport');

const authLessor = passport.authenticate('jwt-authentication-occupant', { session: false });
const authOccupant = passport.authenticate('jwt-authentication-lessor', { session: false });

let auth ;

if (authLessor) {
    auth = passport.authenticate('jwt-authentication-lessor', { session: false });
}
if (authOccupant) {
    auth = passport.authenticate('jwt-authentication-occupant', { session: false });
}

router.post('/register', occupantController.registerOccupant)
router.post('/login', occupantController.loginOccupant)
router.get('/get/:id', auth, occupantController.getOccupantById)
// router.get('/get/',auth, occupantController.getOccupantById)
router.post('/checkUsername', occupantController.checkUsername)







module.exports = router;