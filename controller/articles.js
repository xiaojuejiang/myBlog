const conn = require('../db/db')

const moment = require('moment')

module.exports = {
    handleGetAddArticles(req, res) {
        if (!req.session.isLogin) return res.redirect('/')
        res.render('../views/articles/add.ejs', {
            user: req.session.user,
            isLogin: req.session.isLogin
        })
    },
    handlePostAddArticles(req, res) {
        const body = req.body
        console.log(body)
        if (body.title.trim().length == 0 ||
            body.content.trim().length == 0) return res.status(400).send({
            status: 400,
            msg: '请填写完整'
        })
        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        body.author_id = req.session.user.id
        // res.send(body)
        const insertArt = 'insert into articles set ?'
        conn.query(insertArt, body, (err, result) => {
            if (err) return res.status(500).send({
                status: 500,
                msg: '提交失败,请重新提交'
            })
            // console.log(result)
            if (result.affectedRows != 1) return res.status(500).send({
                status: 500,
                msg: '提交失败,请重新提交'
            })
            let id = result.insertId
            res.send({
                status: 200,
                msg: '提交成功',
                insertId: id
            })
        })
    },
    handleGetInfo(req, res) {
        if (!req.session.isLogin) return res.redirect('/')

        const id = req.params.id

        const sqlStr = 'select * from articles where id = ?'

        conn.query(sqlStr, id, (err, result) => {
            if (err) return res.status(404).res.send({
                status: 400,
                msg: '你查询的文章不存在'
            })
            console.log(result)
        })
        res.render('../views/articles/info.ejs', {
            user: req.session.user,
            isLogin: req.session.isLogin
        })
    }

}