// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  condition: function(e) {
    wx.navigateTo({
      url: "/pages/schedule/schedule"
    })
  },

  apply: function(e) {
    wx.navigateTo({
      url: '/pages/schedule/schedule',
    })
  },

  my: function(e) {
    wx.navigateTo({
      url: '/pages/applylist/applylist',
    })
  }
})