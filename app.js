const express=require('express')

const app=express()

app.use(express.static('./views'))

app.use('/node_modules',express.static('./node_modules'))

app.set('view engine','ejs')

app.set('views','./views')

app.get('/',(req,res)=>{
    res.render('index.ejs',{})
})

app.listen('3003',()=>{
    console.log('server is runing at http://127.0.0.1:3003')
})