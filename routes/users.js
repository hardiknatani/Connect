const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport')


router.get('/profile',passport.checkAuthentication,usersController.profile)

router.get('/signup',usersController.signup)
router.get('/signin',usersController.signin)
router.post('/createUser',usersController.createUser)
router.post('/createSession',passport.authenticate(
    'local',{failureRedirect:'/users/signin'}),usersController.createSession)

router.get('/signout',usersController.destroySession)

module.exports = router;