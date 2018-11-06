const express=require('express')
const path=require('path')
const fs=require('fs')
const session=require('express-session')

const app=express()

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))
//自动获取路由
fs.readdir('./router',(err,result)=>{
    result.forEach(item=>{

        const router=require(path.join(__dirname,'/router',item))
    
        app.use(router)
    })
})


// const indexRouter=require('./router/index.js')
// const userRouter=require('./router/user.js')


// app.use(indexRouter)

// app.use(userRouter)

app.use(express.static('./views'))

app.use('/node_modules',express.static('./node_modules'))

app.set('view engine','ejs')

app.set('views','./views')

app.listen('3003',()=>{
    console.log('server is runing at http://127.0.0.1:3003')
})