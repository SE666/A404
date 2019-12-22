var app = getApp()
Page({
  data: {
    detail: null,
    formId: 0
  },

  onLoad: function (options) {
    var formId = options.formId;
    this.setData({ formId: formId });
    var that = this;
    wx.request({
      url: 'http://132.232.121.52/A404_Server/AdminServlet?method=ShowForm',
      data: {
        formid: formId
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

  changeStatus: function (e) {
    var formId = this.data.formId;
    var status = e.currentTarget.dataset.status;
    wx.request({
      url: 'http://132.232.121.52/A404_Server/AdminServlet?method=ChangeStatus',
      data: {
        formid: formId,
        status: status,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //传统POST方式
      },
      success: function (res) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        wx.navigateBack({})
      }
    })
  },
})