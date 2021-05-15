// pages/chart/chart.js
import * as echarts from '../../ec-canvas/echarts';
import util from '../../utils/util.js';
const app = getApp();

var income = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];      //收入
var expend = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];      //支出
var Chart = null;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        ec: {
            lazyLoad: true
        },

        year: '2021',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        
        this.echartsComponnet = this.selectComponent('#mychart');
        this.getEveryMonthBill();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getEveryMonthBill();
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    init_echarts: function() {
        this.echartsComponnet.init((canvas, width, height) => {
            if(!Chart) {
                console.log("1");
                Chart = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });
            }
            else {
                console.log("2");
                this.setOption(Chart);
            }
            // console.log("1 " + Chart);
            return Chart;
        });
    },

    getOption: function() {
        var option = {
            color: ['#3398DB', '#FF5151'],
            tooltip: {
                trigger: 'axis',
                axisPointer: { 
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            legend: {
                data: ['收入', '支出'],
            },
            xAxis: [{
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                axisTick: {
                    alignWithLabel: true,
                }
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '收入',
                type: 'bar',
                barWidth: '60%',
                data: income,
            },{
                name: '支出',
                type: 'line',
                data: expend,
            }]
        };

        return option;
    },

    setOption: function (Chart) {
        Chart.setOption(this.getOption());
    },

    //获取每月消费的金额
    getEveryMonthBill: function() {
        let url = getApp().globalData.address + "/getEveryMonthBill";

        let data = {
            Year: this.data.year
        };

        let that = this;

        util.HttpGet(url, data, function(res) {
            console.log(res);

            for(var x in res.expend) {         //将浮点数转换成字符串
               expend[x] = (String)(res.expend[x]);
            }
            for(var x in res.income) {
                income[x] = (String)(res.income[x]);
            }

            // console.log(expend);
            // console.log(income);

            that.init_echarts();
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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