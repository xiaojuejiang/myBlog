const express=require('express')
const bodyParser=require('body-parser')


const router=express.Router()

const control=require('../controller/user.js')

router.use(bodyParser.urlencoded({extended:false}))


router.get('/register',control.handleGetRegister)

.get('/login',control.handleGetLogin)

.post('/register',control.handlePostRegister)

.post('/login',control.handlePostLogin)

.get('/logout',control.handleGetLogout)

module.exports=router