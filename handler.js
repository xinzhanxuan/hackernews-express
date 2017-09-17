// 处理业务请求的业务模块

var db = require('./db.js');


// 该模块最终返回的是一个对象
// 这个对象上挂载了各种处理不同请求的业务方法
module.exports.index = function (req, res) {

  // 1. 读取所有新闻数据
  db.findAll('news', function (err, docs) {
    if (err) {
      throw err;
    }

    // 2. 调用模板引擎实现渲染操作
    res.render('index', {title: '新闻列表', list: docs});
  });

};


// 处理显示添加新闻页面
module.exports.submit = function (req, res) {
  // 读取 submit.html 并返回给用户
  res.render('submit');
};


// 处理 get方式添加新闻
module.exports.addGet = function (req, res) {
  // 1. 获取用户 get 方式提交过来的数据
  // req.query
  // 根据用户提交的数据，构建一个用来插入到数据库中的对象
  var model = {
    title: req.query.title,
    url: req.query.url,
    content: req.query.text
  };


  db.insertOne('news', model, function (err, result) {
    if (err) {
      throw err;
    }
    // 3. 让浏览器重定向到
    res.redirect('/');

  });
};

// 处理 post 方式添加新闻
module.exports.addPost = function (req, res) {
  // 1. 获取用户 post 提交的数据
  // req.body
  // console.log(req.body);
  var model = {
    title: req.body.title,
    url: req.body.url,
    content: req.body.text
  };

  db.insertOne('news', model, function (err, result) {
    if (err) {
      throw err;
    }
    // 3. 让浏览器重定向到
    res.redirect('/');

  });

};


// 处理显示详情的方法
module.exports.details = function (req, res) {
  // 1. 获取用户请求的 id
  // req.query._id

  // 2. 根据 id 从数据库中查找对应的数据

  var objId = db.ObjectID(req.query._id);
  
  db.findOne('news', {_id: objId}, function (err, doc) {
    if (err) {
      throw err;
    }
    // 3. 调用 res.render() 进行渲染
    res.render('details', {model: doc})
  });


};