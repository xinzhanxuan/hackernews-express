// 提取一个用来封装 数据操作的 模块

// 加载 mongodb 模块
var mongodb = require('mongodb');
var config = require('./config.js');



// 封装一个连接数据库的代码
function connectDB(callback) {
  // 1. 连接数据库
  var MongoClient = mongodb.MongoClient;
  // 2. 执行连接数据库操作
  MongoClient.connect(config.connStr, function (err, db) {

    // 当连接数据库执行完毕后，直接调用回调函数，把连接数据库的结果传递出去
    callback(err, db);
  });
}



// 1. 封装一个查询所有数据的方法
module.exports.findAll = function (collectionName, callback) {
  // 1. 连接数据库
  connectDB(function (err, db) {
    if (err) {
      // 如果出错，表示连接数据库出错了
      throw err;
    }

    // 连接数据库没出错执行查询操作
    db.collection(collectionName).find().toArray(function (err, docs) {
      db.close();
      // 把查询结果返回出去
      callback(err, docs);
    });
  });
};




// 2. 封装插入一条数据的代码
module.exports.insertOne = function (collectionName, data, callback) {
  connectDB(function (err, db) {
    if (err) {
      throw err;
    }

    db.collection(collectionName).insertOne(data, function (err, result) {
      db.close();
      callback(err, result);
    });
  });
};



// 3. 封装一个查询单条数据的方法
module.exports.findOne = function (collectionName, filter, callback) {
  connectDB(function (err, db) {
    if (err) {
      throw err;
    }

    db.collection(collectionName).find(filter).limit(1).next(function (err, doc) {
      db.close();

      callback(err, doc);
    });
  });
};




// 4. 封装一个用来把字符串转换为 ObjectID的方法
module.exports.ObjectID = function (strId) {
  return new mongodb.ObjectID(strId);
}