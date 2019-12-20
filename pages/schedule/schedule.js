// pages/schedule/schedule.js
const utils = require('../../utils/util.js');
var index = 0;
var count = 0;

function init() {
  var schedule = new Array(7);
  for (let i = 0; i < 7; i++) {
    schedule[i] = new Array(30);
    for (let j = 0; j < 30; j++) {
      schedule[i][j] = "";
    }
  }
  for (var i = 10; i < 15; i++) {
    schedule[0][i] = "occupied";
  }
  schedule[0][i] = "occupied last";

  for (var i = 13; i < 20; i++) {
    schedule[2][i] = "confirmed";
  }
  schedule[2][i] = "confirmed last";

  for (var i = 4; i < 10; i++) {
    schedule[4][i] = "confirmed";
  }
  schedule[4][i] = "confirmed last";

  for (var i = 11; i < 17; i++) {
    schedule[6][i] = "occupied";
  }
  schedule[6][i] = "occupied last";
  return schedule;
}

function isSelected(cell) {
  return cell == "selected" || cell == "selected last";
}

function getStart() {
  var start = [];
  if (count == 0) {
    start = ["00", "00"];
    return start;
  }
  start[0] = ("0" + (parseInt(index / 2) + 8)).slice(-2);  //0+时间，取后两位，用于不足位数补0
  start[1] = index % 2 == 0 ? "00" : "30";
  return start;
}

function getEnd() {
  var end = [];
  if (count == 0) {
    end = ["00", "00"];
    return end;
  }
  var eIndex = index + count;
  end[0] = ("0" + (parseInt(eIndex / 2) + 8)).slice(-2);  //0+时间，取后两位，用于不足位数补0
  end[1] = eIndex % 2 == 0 ? "00" : "30";
  return end;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    schedule: [],
    start: ["00", "00"],
    end: ["00", "00"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      schedule: init()
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
    var start = this.data.start;
    var end = this.data.end;
    if (count != 0) {
      if (!isSelected(schedule[col][row + 1]) && !isSelected(schedule[col][row - 1]) &&
        !isSelected(schedule[col][row])) {
        utils.alert("请选择连续的时间段！");
        return;
      }
    } else {
      index = row;
    }
    if (schedule[col][row] == "") {
      schedule[col][row] = "selected";
      if (!isSelected(schedule[col][row + 1])) {
        schedule[col][row] += " last";
      }
      if (schedule[col][row - 1] == "selected last") {
        schedule[col][row - 1] = "selected";
      }
      if (!isSelected(schedule[col][row - 1]) && isSelected(schedule[col][row + 1])) {
        index--;
      }
      count++;
    } else if (isSelected(schedule[col][row])) {
      if ((isSelected(schedule[col][row + 1])) && isSelected(schedule[col][row - 1])) {
        utils.alert("请选择连续的时间段！");
        return;
      }
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
      schedule: schedule,
      start: getStart(),
      end: getEnd()
    });
  },

  submit: function(e) {
    if(count == 0) {
      utils.alert("请选择时间！");
      return;
    }
    var start = this.data.start;
    var end = this.data.end;
    var startTime = start[0] + ":" + start[1];
    var endTime = end[0] + ":" + end[1];
    wx.navigateTo({
      url:"/pages/application/application?start=" + startTime + "&end=" + endTime
    })
  },

  reset:function(e) {
    index = 0;
    count = 0;
    this.setData({
      schedule: init(),
      start:["00", "00"],
      end:["00", "00"]
    });
  }
})