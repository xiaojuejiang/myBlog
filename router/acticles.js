const express=require('express')

const bodyParser=require('body-parser')

const control=require('../controller/articles.js')

const router=express.Router()

router.use(bodyParser.urlencoded({extended:false}))


router.get('/articles/add',control.handleGetAddArticles)

router.post('/articles/add',control.handlePostAddArticles)

router.get('/articles/info/:id',control.handleGetInfo)

router.get('/articles/edit/:id',control.handleGetEdit)

router.post('/articles/edit',control.handlePostEdit)


module.exports=router