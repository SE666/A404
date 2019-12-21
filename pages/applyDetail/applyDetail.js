var josn = '[{ "id": 1, "stuid": "17020031068", "username": "汪wqs", "phone": "17852417737", "applydate": "2019-10-31", "start": "08:10", "end": "09:10", "number": 5, "ifmedia": "否", "reason": "针对课题“物联网技术在汽车自动驾驶上的具体应用”作研究报告与交流", "status": "待审核", "submitdatetime": "2019-10-31 08:11:15" }]'
var app = getApp()
Page({
  data: {
    detail: []
  },

  onLoad: function (options) {
    var formID = app.globalData.formId;
    this.setData({
      detail: JSON.parse(josn)
    })
    // wx.request({
    //   url: '',
    //   data:{
    //     formID
    //   },
    //   success:function(res){
    //     this.setData({
    //       detail: JSON.parse(res.data)
    //     });
    //   }      
    // });
  },

})