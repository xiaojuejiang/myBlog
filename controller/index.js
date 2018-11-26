const conn = require('../db/db')

module.exports = {
    handleGetIndex(req, res) {
        let page=req.query.page||1
        let pageSize=10
        const sqlStr = `select a.id,a.title,a.ctime,u.nickname from articles as a
        LEFT JOIN user as u
        on a.author_id=u.id
        order by a.id desc
        limit ${(page-1)*pageSize},${pageSize};
        select count(*) as count from articles
        `
        conn.query(sqlStr, (err, result) => {
            if (err) return res.send({
                status: 500,
                msg: err.message
            })
            // console.log(result)
            if(!result)result=[[]]
            // console.log(result)
            let total=Math.ceil(result[1][0].count/pageSize)
            // console.log(total)
            res.render('index.ejs', {
                user: req.session.user,
                isLogin: req.session.isLogin,
                result: result[0],
                page:page,
                total:total
            })
        })

    },
}