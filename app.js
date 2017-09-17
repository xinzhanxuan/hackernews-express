
// 加载 express 模块
var express = require('express');
// 加载 config 模块
var config = require('./config.js');
// 加载路由模块
var router = require('./router.js');
var path = require('path');
// 加载 body-parser 模块（中间件）
var bodyParser = require('body-parser');

// 创建 app
var app = express();


// 使用 html 作为模板文件后缀
// 1. 
app.set('views', path.join(__dirname, 'htmls'));
// 2. 创建一个自己的模板引擎，自己的模板引擎使用 html 作为模板文件后缀
app.engine('html', require('ejs').renderFile);
// 3. 设置使用某个模板引擎
app.set('view engine', 'html');


// 用户请求报文体中的数据是一个查询字符串类似于：name=bob&age=18
// 要把这个 post 数据转换为 json 对象（{name: 'bob', age: 18}）
// 使用 querystring 模块来转换
// 使用 qs 模块来转换
// console.log(bodyParser.urlencoded({ extended: false }).toString());
// req.body


// 设置使用 body-parser 插件
// 执行完毕这句代码后，当用户再请求的时候就会把 post 中的数据设置到 req.body 中
app.use('/', bodyParser.urlencoded({ extended: false }));
// 接下就可以使用 req.body 了


// 注册路由
// 加载路由模块来进行路由注册
// 通过下面的代码就将 router 中设置的所有路由应用到了 app 对象上
// app.use('/', router);
app.use(router);






// 启动服务
app.listen(config.port, function () {
  console.log('http://localhost:' + config.port);
});