const express=require('express')
const moment=require('moment')
const bodyParser=require('body-parser')

const conn=require('../modules/bd')

const router=express.Router()

router.use(bodyParser.urlencoded({extended:false}))


router.get('/register',(req,res)=>{
    res.render('user/register.ejs',{})
})
.get('/login',(req,res)=>{
    res.render('user/login.ejs',{})
})
.post('/register',(req,res)=>{
    const body=req.body
    if(body.username.trim().length==0||
    body.password.trim().length==0||
    body.nickname.trim().length==0) return res.status(400).send({status:400,msg:'请输入正确填写'})
    const sqlStr='select count(*) as count from user where username=?'
    conn.query(sqlStr,body.username,(err,result)=>{
        if(err) return res.status(500).send({status:500,msg:'检测重复失败'})
        if(result[0].count!=0) return res.status(402).send({status:400,msg:'用户名已存在'})
        const sqlStr1='insert into user set ?'
        req.body.ctime=moment().format('YYYY-MM-DD hh:mm:ss')
        conn.query(sqlStr1,body,(err,result)=>{
            if(err) return res.status(500).send({status:500,msg:'数据库添加失败'})
            if(result.affectedRows!=1) return res.status(500),send({status:500,msg:'添加失败'})
            res.send({status:200,msg:'注册成功'})
        })
    })
})
.post('/login',(req,res)=>{
    const body=req.body
    if(body.username.trim().length==0||body.password.trim().length==0) return res.status(400).send({status:400,msg:'请填写用户名和密码'})
    const sqlStr='select count(*) as count from user where username=? and password=?'
    conn.query(sqlStr,[body.username,body.password],(err,result)=>{
        if(err) return res.status(500).send({status:500,msg:err.message})

        if(result[0].count== 0)return res.status(400).send({status:400,msg:'用户名或密码错误'})
        res.send({status:200,msg:'登录成功'})
    })
})

module.exports=router