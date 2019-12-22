var app = getApp()
Page({
  data: {
    // tab切换 
    condition: 0,
    currentTab: 0,
    all: [],
  },
  details: function (e) {
    var formId = e.currentTarget.dataset.formid;
    console.log(formId);
    wx.navigateTo({
      url: "/pages/applyDetail/applyDetail?formId=" + formId
    });
  },
  swichNav: function (e) {
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
    this.setData({
      currentTab: e.detail.current,
    })
  },
  onShow: function (e) {
    var that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    wx.request({
      url: 'http://132.232.121.52/A404_Server/AdminServlet?method=ShowAll',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //传统POST方式
      },
      success: function (res) {
        that.setData({
          all: res.data
        });
        console.log(res.data);
        wx.hideLoading();
      }
    })
  },
})