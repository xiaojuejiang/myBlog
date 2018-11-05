const express=require('express')

const app=express()

const indexRouter=require('./router/index.js')
const userRouter=require('./router/user.js')


app.use(indexRouter)

app.use(userRouter)

app.use(express.static('./views'))

app.use('/node_modules',express.static('./node_modules'))

app.set('view engine','ejs')

app.set('views','./views')

app.listen('3003',()=>{
    console.log('server is runing at http://127.0.0.1:3003')
})