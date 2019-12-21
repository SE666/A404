// var josn = '[{ "id": 1, "stuid": "17020031068", "username": "汪wqs", "phone": "17852417737", "applydate": "2019-10-31", "start": "08:10", "end": "09:10", "number": 5, "ifmedia": "否", "reason": "****", "status": "待审核", "submitdatetime": "2019-10-31 08:11:15" }, { "id": 2, "stuid": "17020031068", "username": "汪wqs", "phone": "17852417737", "applydate": "2019-10-31", "start": "09:45", "end": "10:45", "number": 7, "ifmedia": "是", "reason": "####", "status": "审核通过", "submitdatetime": "2019-10-31 08:22:40" }, { "id": 3, "stuid": "17020031068", "username": "汪wqs", "phone": "17852417737", "applydate": "2019-10-31", "start": "09:45", "end": "10:45", "number": 7, "ifmedia": "是", "reason": "####", "status": "未还钥匙", "submitdatetime": "2019-10-31 08:22:40" }, { "id": 4, "stuid": "17020031068", "username": "汪wqs", "phone": "17852417737", "applydate": "2019-10-31", "start": "09:45", "end": "10:45", "number": 7, "ifmedia": "是", "reason": "####", "status": "未通过", "submitdatetime": "2019-10-31 08:22:40"}]'
var app = getApp()
Page({
  data: {
    // tab切换 
    condition: 0,
    currentTab: 0,
    all: [],
  },
  details: function (e) {
    app.globalData.formId = e.target.dataset.formid;
    wx.navigateTo({
      url: "/pages/applyDetail/applyDetail"
    });
  },
  swichNav: function (e) {
    console.log("swichNac called\n");
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  swiperChange: function (e) {
    console.log("swiperChange called\n");
    this.setData({
      currentTab: e.detail.current,
    })
  },
  onShow:function(e){
    var that = this;
    wx.request({
      url: 'http://132.232.121.52/A404_Server/AdminServlet?method=ShowAll',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //传统POST方式
      },
      success: function (res) {
        that.setData({
          all: res.data
        });
      }
    })
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载 
    var that = this;
    wx.request({
      url: 'http://132.232.121.52/A404_Server/AdminServlet?method=ShowAll',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //传统POST方式
      },
      success: function (res) {
        that.setData({
          all: res.data
        });
      }
    })
  },
})