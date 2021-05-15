"use strict"

var express = require("express");
const {lstat} = require("fs");
var router = express.Router();
var connect = require("../db/mysqlConnect");

router.get('/', function(req, res) {

    let date = req.query.Date;

    let sql = "SELECT BillNo, Money, Flag, AddTime FROM bill where BillDate = ? ORDER BY AddTime DESC";
    let params = [date];

    try {
        connect.query(sql, params, function(results, fields) {
            console.log(results);

            let expend = 0;
            let income = 0;
            let historyList = [];
    
            for(var i = 0; i < results.length; i++) {
                let list = {};
                list.BillNo = results[i].BillNo;
                list.Money = results[i].Money;
                list.Flag = results[i].Flag;
                list.AddTime = results[i].AddTime.substr(0, 5);
    
                if(results[i].Flag == 1) expend += results[i].Money;
                else income += results[i].Money;
                historyList.push(list);
            }
            
            let responseDate = {};
            responseDate.expend = expend;
            responseDate.income = income;
            responseDate.historyList = historyList;

            try {
                res.json(responseDate);
            } catch (e) {
                console.error(e);
            }
            
        });
    } catch (e) {
        console.error(e);
    }
    
});

module.exports = router;