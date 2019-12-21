var josn = '[{ "id": 1, "stuid": "17020031068", "username": "汪wqs", "phone": "17852417737", "applydate": "2019-10-31", "start": "08:10", "end": "09:10", "number": 5, "ifmedia": "否", "reason": "****", "status": "待审核", "submitdatetime": "2019-10-31 08:11:15" }, { "id": 2, "stuid": "17020031068", "username": "汪wqs", "phone": "17852417737", "applydate": "2019-10-31", "start": "09:45", "end": "10:45", "number": 7, "ifmedia": "是", "reason": "####", "status": "审核通过", "submitdatetime": "2019-10-31 08:22:40" }, { "id": 3, "stuid": "17020031068", "username": "汪wqs", "phone": "17852417737", "applydate": "2019-10-31", "start": "09:45", "end": "10:45", "number": 7, "ifmedia": "是", "reason": "####", "status": "未还钥匙", "submitdatetime": "2019-10-31 08:22:40" }, { "id": 4, "stuid": "17020031068", "username": "汪wqs", "phone": "17852417737", "applydate": "2019-10-31", "start": "09:45", "end": "10:45", "number": 7, "ifmedia": "是", "reason": "####", "status": "未通过", "submitdatetime": "2019-10-31 08:22:40"}]'
var app = getApp()
Page({
  data: {
    // tab切换 
    condition: 0,
    currentTab: 0,
    all: [],
  },
  details: function (e) {
    // var formID = e.target.dataset.formid;
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
  onLoad: function (options) {
    // 生命周期函数--监听页面加载 
    this.setData({
      all: JSON.parse(josn)
    });
    console.log(josn.length);
    wx.request({
      url: '',
      data: {

      },
      success: function (res) {
        this.setData({
          all: JSON.parse(res.data)
        });
      }
    })
  },
})