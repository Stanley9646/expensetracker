const express = require('express');
const {registerController , loginController , forgotPasswordController} = require('../controllers/authController')

const { requireSignIn } = require('../middlewares/authMiddleware');

const router = express.Router();

//register

router.post('/register', registerController)

//login
router.post ('/login', loginController)
//test


//forgot password
router.post ('/forgot-password' , forgotPasswordController)
//protected USER route - auth
router.get ('/user-auth' , requireSignIn , (req,res) => {
    res.status(200).send({ok: true});
})

module.exports=router