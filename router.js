

// 创建一个路由模块
// 1. 加载 express 模块
var express = require('express');
var path = require('path');
var handler = require('./handler.js');

// 2. 创建路由对象
var router = express.Router();



// 3. 通过 router 对象挂载（设置）各种路由
// router.get('/', function (req, res) {
//   // 显示新闻列表
//   handler.index(req, res);
// });

// 处理请求首页（显示新闻列表）
router.get('/', handler.index);
router.get('/index', handler.index);

// 处理显示添加新闻页面
router.get('/submit', handler.submit);

// get 方式添加一条新闻
router.get('/add', handler.addGet);

// 通过 post 方式向服务器添加一条新闻
router.post('/add', handler.addPost);

// 点击显示详情
router.get('/details', handler.details);








// 处理静态资源
router.use('/resources', express.static(path.join(__dirname, 'resources')));

// 处理 404 错误，默认不写 express 会有自己的处理方法就是简单的返回一个 can not get 路径

// 处理浏览器请求 /favicon.ico 




// 4. 把创建的 router 对象暴露出去
module.exports = router;

