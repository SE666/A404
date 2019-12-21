//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    applylist: []
  },
  onLoad: function () {
    var that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    wx.request({
      url: 'http://132.232.121.52/A404_Server/FormServlet?method=findByUserid',
      data: {
        userid:1
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //传统POST方式
      },
      success: function (res) {
        that.setData({
          applylist: res.data
        });
        wx.hideLoading();
      }
    })
  }
})
