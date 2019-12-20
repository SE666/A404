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
      start: options.start,
      end: options.end
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  submitApplication: function (e) {
    var UID = e.detail.value.UID;
    var name = e.detail.value.name;
    var phone = e.detail.value.phone;
    var num = e.detail.value.num;
    var media = e.detail.value.media;
    console.log(e.detail);
    if (utils.isEmpty(UID) || utils.isEmpty(name) || utils.isEmpty(phone)
      || utils.isEmpty(num) || utils.isEmpty(media)) {
      utils.alert("以上信息均不能为空！");
      return false;
    } else if (utils.isEmpty(name)) {
      return false;
    }
    var that = this;
    wx.request({
      url: 'http://localhost',
      data: {
        "UID": UID,
        "name": name,
        "phone": phone,
        "num": num,
        "media": media
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
      },
      fail: function (res) {
        console.log(res);
      }
    })
  }
})