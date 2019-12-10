//index.js
//获取应用实例
const app = getApp()
var json = '[{"id":1,"stuid":"17020031068","username":"汪wqs","phone":"17852417737","applydate":"2019-10-31","start":"08:10","end":"09:10","number":5,"ifmedia":"否","reason":"****","status":"待审核","submitdatetime":"2019-10-31 08:11:15"},{"id":2,"stuid":"17020031068","username":"汪wqs","phone":"17852417737","applydate":"2019-10-31","start":"09:45","end":"10:45","number":7,"ifmedia":"是","reason":"####","status":"审核通过","submitdatetime":"2019-10-31 08:22:40"}]';

Page({
  data: {
    applylist: []
  },
  onLoad: function () {
    var that = this;
    this.setData({applylist: JSON.parse(json)});
  }
})
