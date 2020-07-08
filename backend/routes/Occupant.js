const express = require('express');
const router = express.Router();
const occupantController = require('../controllers/Occupant');
const passport = require('passport');

const auth = passport.authenticate('jwr-authentication',{session: false});

 router.post('/register',occupantController.registerOccupant)
 router.post('/login',occupantController.loginOccupant)
 router.get('/getOccupantById/:id',auth,occupantController.getOccupantById) 
 router.post('/checkUsername',occupantController.checkUsername)







module.exports = router;