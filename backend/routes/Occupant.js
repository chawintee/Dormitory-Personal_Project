const express = require('express');
const router = express.Router();
const occupantController = require('../controllers/Occupant');

 router.post('/register',occupantController.registerOccupant)
 router.post('/login',occupantController.loginOccupant)
 router.get('/getOccupantById/:id',occupantController.getOccupantById) 
 router.post('/checkUsername',occupantController.checkUsername)







module.exports = router;