// pages/index/index1.js
var util = require('../../utils/util.js')
var myUtil = require("../../utils/myUtil.js")

var touchStartTime = 0;
var touchEndTime = 0;

Page({
  /*
   * 页面的初始数据
   */
  data: {
    //首页参数
    expend : "0",
    income : "0",
    selectDate : " ",

    //每日账单参数
    historyList : [],

    //软件盘参数
    passwordInputHidden : true,        //true, 隐藏软键盘
    ischecked : 1,                   //选择支出或收入, true表示选择支出
                                        //flase表示选择收入
    money : "",            //显示的金额
    keyborad_date : "",     //日期
    billNo : "",
    addTime : "",
  },

  //根据日期计算选定日期的支出与收入
  getSelectDayBill : function(date) {
    let data = {
      Date : date
    };
    let that = this;

    let url = getApp().globalData.address + "/getSelectDayBill";
    util.HttpGet(url, data, function(res) {
    
      that.setData({
        expend : res.expend,
        income : res.income,
        historyList : res.historyList,
      })
      console.log(res.historyList);
    }) 
  },

  //点击开始时间
  onTouchStart: function(e) {
    touchStartTime = e.timeStamp;
  },

  //点击结束时间
  onTouchEnd: function(e) {
    touchEndTime = e.timeStamp;
  },

  //点击账单条目
  bindBillClick: function(e) {
    let that = this;
    let BillNo = e.currentTarget.dataset.id;
    if (touchEndTime - touchStartTime > 500) {
      wx.showModal({
        title: '提示',
        content: '是否确认删除该记录！',
        success: function (res) {
          if (res.confirm) {
            that.delRecordBill(BillNo);
          }
        }
      })
    } 
  },

  //删除账单记录
  delRecordBill: function(BillNo) {
    let that = this;
    let url = getApp().globalData.address + "/delRecordBill";
    let data = {
      BillNo: BillNo
    }
    util.HttpGet(url, data, function (res) {
      if(res.Code == 1) {
        wx.showToast({
          title : '删除成功',
          duration : 700,
          icon : "success",
        });
        that.getSelectDayBill(that.data.selectDate);
      }
      else {
        wx.showToast({
          title: '删除失败',
          duration: 700,
          icon : "success",
        });
      }
    })
  },
  
  //软件盘函数---->
  showInput: function() {
    this.setData({
      passwordInputHidden: false
    });
  },

  //确定按钮
  passwordInputHidden: function() {
    if(util.isNull(this.data.money) || this.data.money == 0) {
      wx.showToast({
        title: '请输入具体金额',
        duration: 700,
      });
      this.setData({
        passwordInputHidden : true,
      });

      return 0;
    }

    var time = util.formatTime(new Date, "hh:mm");
    var uniqueNo = myUtil.guid();

    this.setData({
      passwordInputHidden: true,
      billNo: uniqueNo,
      addTime : time,
    });

    //传数据到后端
    let data = {
      Money : this.data.money,
      BillDate : this.data.keyborad_date,
      Flag : this.data.ischecked,
      AddTime : this.data.addTime,
      BillNo : this.data.billNo,
    };
    
    let url = getApp().globalData.address + "/addBill";
    let that = this;

    util.HttpGet(url, data, function(res) {
      console.log("res + " + res.Code);
      if(res.Code == 1) {
        wx.showToast({
          title : '记账成功',
          duration : 700,
          icon : "success",
        });
        that.getSelectDayBill(that.data.selectDate);
      }
      else {
        wx.showToast({
          title: '记账失败',
          duration: 700,
          icon : "success",
        });
      }
    })

    //清除上一轮输入的金额
    this.setData({
      money : "",
    });
  },

  //选择支出
  bindChooseExpend: function() {
    this.setData({
      ischecked : 1,
    });
  },

  //选择收入
  bindChooseIncome: function() {
    this.setData({
      ischecked : 0,
    });
  },

  //输入金额
  bindInputMoney: function(e) {

    this.data.money += e.currentTarget.dataset.key;
    this.setData({
      money : this.data.money,
    });
  },

  //执行输入金额删除操作
  bindClear: function() {
    var temp = this.data.money;
    if(temp == "") {
      temp = " ";
    }
    else {
      temp = temp.substr(0, temp.length - 1);
    }

    this.setData({
      money: temp,
    });
  },
  //软件盘函数 <----

  //选择日期函数
  bindDateChange : function(e) {
    this.setData({
      selectDate : e.detail.value,
    });

    var date = e.detail.value;
    this.getSelectDayBill(date);
  },

  bindKeyboardDateChange : function(e) {
    this.setData({
      keyborad_date : e.detail.value,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // this.setData({
    //   billNo: Number(Math.random().toString().substr(3,30) + Date.now()).toString(36),
    // });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //设置当前时间
    var date = util.formatTime(new Date, 'yyyy-MM-dd');
    this.setData({
      selectDate : date,
      keyborad_date : date,
    }),
    //打印

    this.getSelectDayBill(date);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})