"use strict"

var express = require("express");
var router = express.Router();
var connect = require("../db/mysqlConnect");

router.get('/', function(req, res) {

    let Year = req.query.Year;

    let sql = "SELECT DATE_FORMAT(BillDate,'%m') AS Month, Money, Flag "
            + "FROM bill "
            + "WHERE DATE_FORMAT(BillDate,'%Y') = ? "
            + "ORDER BY month";
    
    let params = [Year];

    try {
        connect.query(sql, params, function(results, fields) {
            let responseData = {};
    
            var income = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];      //收入
            var expend = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];      //支出
    
            console.log(results);
            for(var i in results) {
                let Month = results[i].Month[1] - 1;
                let Money = results[i].Money - 1;
                let Flag = results[i].Flag;
    
                if(Flag == 1)  {         //支出
                    expend[Month] += Money;
                }
                else {                   //收入
                    income[Month] += Money;
                }
            }
            console.log(expend);
            console.log(income);

            responseData.expend = expend;
            responseData.income = income;
            
            res.json(responseData);
        });
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;