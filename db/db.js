const mysql=require('mysql')

const conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'blog',
    multipleStatements:true
})

module.exports=conn