var app = getApp()
Page({
  data: {
    detail: []
  },
  onLoad: function (options) {
    var formID = app.globalData.formId;
    var that = this;
    wx.request({
      url: 'http://132.232.121.52/A404_Server/AdminServlet?method=ShowForm',
      data: {
        formid: formID
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //传统POST方式
      },
      success: function (res) {
        that.setData({
          detail: res.data
        });
      },
    })
  },
  Pass:function(CHstatus){
    wx.request({
      url: 'http://132.232.121.52/A404_Server/AdminServlet?method=ChangeStatus',
      data:{
        formid: app.globalData.formId,
        status:'审核通过',
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //传统POST方式
      },
      success:function(res){
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];   //当前页面
          var prevPage = pages[pages.length - 2];  //上一个页面
          wx.navigateBack({//返回
            delta: 1
          })
        }, 1000);
      }
    })
  },
  NoPass:function(status){
    // url: 'http://132.232.121.52/A404_Server/AdminServlet?method=Login',

    //   data: {
    //   stuid: ,//填写id
    //   password: //填写密码
    //   },
    wx.request({
      url: 'http://132.232.121.52/A404_Server/AdminServlet?method=ChangeStatus',

      data: {
        formid: app.globalData.formId,
        status: '未通过',
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //传统POST方式
      },
      success: function (res) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        }),
          setTimeout(function () {
            var pages = getCurrentPages();
            var currPage = pages[pages.length - 1];   //当前页面
            var prevPage = pages[pages.length - 2];  //上一个页面
            wx.navigateBack({//返回
              delta: 1
            })
          }, 1000);
      }
    })
  },
})