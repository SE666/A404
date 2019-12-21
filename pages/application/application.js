// pages/application/application.js
const utils = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: "00:00",
    end: "00:00"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      date: options.date,
      start: options.start,
      end: options.end
    })
  },

  /**
   * 申请表提交响应函数
   */
  submitApplication: function (e) {
    var userid = e.detail.value.userid;
    var name = e.detail.value.name;
    var phone = e.detail.value.phone;
    var num = e.detail.value.num;
    var media = e.detail.value.media;
    var reason = e.detail.value.reason;
    console.log(e.detail);
    if (utils.isEmpty(userid) || utils.isEmpty(name) || utils.isEmpty(phone)
      || utils.isEmpty(num) || utils.isEmpty(media) || utils.isEmpty(reason)) {
      utils.alert("以上信息均不能为空！");
      return false;
    }
    var that = this;
    wx.request({
      url: 'http://132.232.121.52/A404_Server/FormServlet?method=submit',
      data: {
        "userid": 1,
        "applydate": that.data.date,
        "start": that.data.start,
        "end": that.data.end,
        "number": num,
        "ifmedia": media,
        "reason": reason
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' //传统POST方式
      },
      success: function (res) {
        console.log(res);
        if(res.data == "1") {
          utils.alert("提交申请成功！");
          //刷新时刻表并跳转回时刻表
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2];
          prevPage.onLoad();
          wx.navigateBack({})
        } else {
          utils.alert("提交申请失败！");
        }
      },
      fail: function (res) {
        utils.alert("提交申请失败！");
      }
    })
  }
})