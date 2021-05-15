"use strict"

var express = require("express");
var router = express.Router();
var connect = require("../db/mysqlConnect");

router.get('/', function(req, res) {
    try {
        var Money = req.query.Money;
        var BillDate = req.query.BillDate;
        var AddTime = req.query.AddTime;
        var BillNo = req.query.BillNo;
        var Flag = req.query.Flag;        
    } catch (e) {
        console.error(e);
    }

    let params = [BillNo, BillDate, Money, AddTime, Flag]; 

    let sql = "INSERT INTO bill(BillNo, BillDate, Money, AddTime, Flag) VALUES (?,?,?,?,?)";

    var responseData = {};
    try {
        connect.query(sql, params, function(results, fields) {

            console.log("results: ##########");
            console.log(results);

            let responseData = {};

            try {
                if(results.affectedRows > 0)
                    responseData.Code = 1;
                else responseData.Code = 0; 
            } catch (e) {
                responseData.Code = 0;
                console.error(e);
            }
            res.json(responseData);
        });
    }
    catch(e) {
        responseData.Code = 0;
        res.json(responseData);
        console.error(e);
    }
});

module.exports = router;