const conn = require('../db/db')

const moment = require('moment')

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    //渲染登录页面
    handleGetLogin(req, res) {
        res.render('user/login.ejs', {})
    },
    //渲染注册页面
    handleGetRegister(req, res) {
        res.render('user/register.ejs', {})
    },
    //处理登录请求
    handlePostLogin(req, res) {
        const body = req.body
        if (body.username.trim().length == 0 || body.password.trim().length == 0) return res.status(400).send({
            status: 400,
            msg: '请填写用户名和密码'
        })
        const sqlStr = 'select * from user where username=?'
        conn.query(sqlStr, [body.username], (err, result) => {
            if (err) return res.status(500).send({
                status: 500,
                msg: err.message
            })
            // console.log(result)
            if (result.length == 0) return res.status(400).send({
                status: 400,
                msg: '用户名或密码错误'
            })
            bcrypt.compare(body.password, result[0].password, (err, compareResult) => {
                if (!compareResult) res.status(400).send({
                    status: 400,
                    msg: '用户名或密码错误'
                })
                req.session.user = result[0]
                req.session.isLogin = true
                let hour = 1000 * 60 * 60 * 24 * 30
                req.session.cookie.expires = new Date(Date.now() + hour)
                res.send({
                    status: 200,
                    msg: '登录成功'
                })
            })
        })
    },
    //处理注册请求
    handlePostRegister(req, res) {
        const body = req.body
        if (body.username.trim().length == 0 ||
            body.password.trim().length == 0 ||
            body.nickname.trim().length == 0) return res.status(400).send({
            status: 400,
            msg: '请输入正确填写'
        })
        const sqlStr = 'select count(*) as count from user where username=?'
        conn.query(sqlStr, body.username, (err, result) => {
            if (err) return res.status(500).send({
                status: 500,
                msg: '检测重复失败'
            })
            if (result[0].count != 0) return res.status(402).send({
                status: 400,
                msg: '用户名已存在'
            })
            bcrypt.hash(body.password, saltRounds, (err, hash) => {
                if (err) return res.status(500).send({
                    status: 500,
                    msg: '加密失败' + err
                })
                body.password = hash
                const sqlStr1 = 'insert into user set ?'
                body.ctime = moment().format('YYYY-MM-DD hh:mm:ss')
                conn.query(sqlStr1, body, (err, result) => {
                    if (err) return res.status(500).send({
                        status: 500,
                        msg: '数据库添加失败'
                    })
                    if (result.affectedRows != 1) return res.status(500), send({
                        status: 500,
                        msg: '添加失败'
                    })
                    res.send({
                        status: 200,
                        msg: '注册成功'
                    })
                })
            })

        })
    },
    //注销
    handleGetLogout(req, res) {
        req.session.destroy(err => {
            if (err) return res.send({
                status: 500,
                msg: "退出失败,请重试"
            })
            res.redirect('/')
        })

    }
}