const express = require('express');
const passport = require('passport');
const router = express.Router();
const commentsController = require('../controllers/comments_controller')



router.post('/createComment',passport.checkAuthentication,commentsController.createComment)
router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy)
module.exports = router;