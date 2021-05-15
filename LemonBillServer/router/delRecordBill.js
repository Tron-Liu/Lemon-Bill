'use strict'
var express = require('express');

var router = express.Router();
var connect = require("../db/mysqlConnect");

router.get('/', function (req, res) {

    let BillNo = req.query.BillNo;
   
    let sql = "DELETE FROM `bill` WHERE BillNo=?";
    let params = [BillNo];

    var responseData = {};

    try {
        connect.query(sql, params, function (results, fields) {
            console.log(results);
    
            let responseData = {};
    
            try {
                if(results.affectedRows == 1)
                responseData.Code = 1;
                else responseData.Code = 0;
            } catch (e) {
                responseData.Code = 0;
                console.error(e);
            }
            res.json(responseData);
        });
    } catch (e) {
        responseData.Code = 0;
        res.json(responseData);
        console.error(e);
    }
    

});

module.exports = router;
