/***
 * this module is used for handling request of register and login
 */
const http = require('http');
const express = require('express');
const qs = require('querystring');
const pool = require('./pool');

//create server
var app = express();
http.createServer(app).listen(8080);

//指定静态资源库
app.use(express.static('public'));

//指定路由
app.get('/login', (req, res)=> {
    "use strict";
    //建立数据库链接
    pool.getConnection((err, conn)=> {
        if (err) {
            throw new err;
        } else {
            conn.query(
                'select * from user where uname=? and upwd=?',
                [req.query.uname, req.query.upwd],
                (err, data)=> {
                    if (err) {
                        throw new err;
                    } else if (data === []) {
                        res.json({code: -1});
                    } else {
                        console.log(data);
                        res.json({code: 1});
                    }
                    conn.release();
                }
            );
        }
    });
});

app.get('/register', (req, res)=> {
    "use strict";
    //连接数库
    pool.getConnection((err, conn)=> {
        if (err) {
            throw new err;
        } else {
            conn.query(
                'insert into user values(null,?,?)',
                [req.query.uname, req.query.upwd],
                (err, data)=> {
                    if (err) {
                        throw new err;
                    } else {
                        res.json({code: 1});
                        console.log(data);
                    }
                    conn.release();
                }
            );
        }
    });
});

