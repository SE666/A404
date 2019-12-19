// pages/schedule/schedule.js
const utils = require('../../utils/util.js');
var start = -1;
var count = 0;

function init(schedule) {
  for (let i = 10; i < 15; i++) {
    schedule[0][i] = "occupied";
  }

  for (let i = 13; i < 20; i++) {
    schedule[2][i] = "confirmed";
  }

  for (let i = 4; i < 10; i++) {
    schedule[4][i] = "confirmed";
  }

  for (let i = 11; i < 17; i++) {
    schedule[6][i] = "occupied";
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schedule: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var array = new Array(7);
    for (let i = 0; i < 7; i++) {
      array[i] = new Array(30);
      for (let j = 0; j < 30; j++) {
        array[i][j] = "";
      }
    }
    init(array);
    this.setData({
      schedule: array
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onCellTap: function(e) {
    var col = e.currentTarget.dataset.col;
    var row = e.currentTarget.dataset.row;
    var schedule = this.data.schedule;
    if (count != 0) {
      if (schedule[col][row + 1] != "selected" && schedule[col][row + 1] != "selected last" &&
        schedule[col][row - 1] != "selected" && schedule[col][row - 1] != "selected last" &&
        schedule[col][row] != "selected" && schedule[col][row] != "selected last") {
        utils.alert("请选择连续的时间段！");
        return;
      }
    } else {
      start = row;
    }
    if (schedule[col][row] == "") {
      schedule[col][row] = "selected";
      if (schedule[col][row + 1] != "selected" && schedule[col][row + 1] != "selected last") {
        schedule[col][row] += " last";
      }
      if (schedule[col][row - 1] == "selected last") {
        schedule[col][row - 1] = "selected";
      }
      count++;
    } else if (schedule[col][row] == "selected" || schedule[col][row] == "selected last") {
      schedule[col][row] = "";
      if (schedule[col][row - 1] == "selected") {
        schedule[col][row - 1] += " last";
      }
      count--;
    } else {
      utils.alert("该时间段已经被占用！");
      return;
    }
    this.setData({
      schedule: schedule
    });
  },

  submit: function(e) {
    console.log(start, count);
  }
})