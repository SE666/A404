// pages/schedule/schedule.js
const utils = require('../../utils/util.js');
var index = 0;
var count = 0;
var origin = null;  //原始表格数组数据
var dateStart = null;
var dateEnd = null;

function formatDate(dateobj) {
  var year = dateobj.getFullYear();
  var month = dateobj.getMonth() + 1;
  var date = dateobj.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  return year + "-" + month + "-" + date;
}

/**
 * 获取离当前日期最近的星期一的日期
 */
function getMonDate() {
  var now = new Date();
  var day = now.getDay();
  var minus = day == 0 ? 6 : day - 1;
  now.setDate(now.getDate() - minus);
  return now;
}

/**
 * 获取离当前日期最近的星期日的日期
 */
function getSunDate() {
  var now = new Date();
  var day = now.getDay();
  var plus = day == 0 ? 0 : 7 - day;
  now.setDate(now.getDate() + plus);
  return now;
}

/**
 * 当前单元格是否被选中
 */
function isSelected(cell) {
  return cell == "selected" || cell == "selected last";
}

/**
 * 获取所选时间段的开始时间
 */
function getStart() {
  var start = [];
  if (count == 0) {
    start = ["00", "00"];
    return start;
  }
  start[0] = ("0" + (parseInt(index / 2) + 8)).slice(-2); //0+时间，取后两位，用于不足位数补0
  start[1] = index % 2 == 0 ? "00" : "30";
  return start;
}

/**
 * 获取所选时间段的结束时间
 */
function getEnd() {
  var end = [];
  if (count == 0) {
    end = ["00", "00"];
    return end;
  }
  var eIndex = index + count;
  end[0] = ("0" + (parseInt(eIndex / 2) + 8)).slice(-2); //0+时间，取后两位，用于不足位数补0
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
    end: ["00", "00"],
    dateSelected: "00-00-00",
    dateStart: "00-00-00",
    dateEnd: "00-00-00",
    next: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var start = getMonDate();
    var end = getSunDate();
    dateStart = start;
    dateEnd = end;
    this.getSchedule(start, end);
  },

  getSchedule: function (start, end) {
    var dateStart = formatDate(start);
    var dateEnd = formatDate(end);
    var that = this;
    wx.request({
      url: 'http://132.232.121.52/A404_Server/FormServlet?method=schedule',
      data: {
        dateStart: dateStart,
        dateEnd: dateEnd
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' //传统POST方式
      },
      success: function (res) {
        origin = JSON.stringify(res.data); //保存原始数组的Json供重置时使用
        that.setData({
          schedule: res.data,
          dateStart: dateStart,
          dateEnd: dateEnd
        });
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },

  nextweek: function () {
    dateStart.setDate(dateStart.getDate() + 7);
    dateEnd.setDate(dateEnd.getDate() + 7);
    this.getSchedule(dateStart, dateEnd);
    this.setData({
      next: true
    })
  },

  prevweek: function () {
    dateStart.setDate(dateStart.getDate() - 7);
    dateEnd.setDate(dateEnd.getDate() - 7);
    this.getSchedule(dateStart, dateEnd);
    this.setData({
      next: false
    })
  },

  /**
   * 单元格被点击响应函数
   */
  onCellTap: function (e) {
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
      var dateSelected = new Date();
      dateSelected.setDate(dateStart.getDate() + col);
      this.setData({
        dateSelected: formatDate(dateSelected)
      })
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

  /**
   * 提交按钮点击响应函数
   */
  submit: function (e) {
    if (count == 0) {
      utils.alert("请选择时间！");
      return;
    }
    var start = this.data.start;
    var end = this.data.end;
    var date = this.data.dateSelected;
    var startTime = start[0] + ":" + start[1];
    var endTime = end[0] + ":" + end[1];
    wx.navigateTo({
      url: "/pages/application/application?date=" + date + "&start=" + startTime + "&end=" + endTime
    })
  },

  /**
   * 重置按钮点击响应函数
   */
  reset: function (e) {
    index = 0;
    count = 0;
    this.setData({
      schedule: JSON.parse(origin),
      start: ["00", "00"],
      end: ["00", "00"]
    });
  }
})