'use strict'
var express = require('express');
var app = express();
// var fs = require('fs');
var http = require('http');

//routes
app.get('/', function (req, res) {
   res.send('Hello World');
})

//删除消费记录
app.use('/delRecordBill', require('./router/delRecordBill'));

//根据选择的日期获取支出和收入
app.use('/getSelectDayBill', require('./router/getSelectDayBill'));

//添加账单
app.use('/addBill', require('./router/addBill'));

//查询每月消费的金额
app.use('/getEveryMonthBill', require('./router/getEveryMonthBill'));

var httpServer = http.createServer(app);

httpServer.listen(8012, function() {
  console.log("httpServer is OK");
});
