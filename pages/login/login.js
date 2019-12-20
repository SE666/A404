// pages/index2/index2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: " ",
    password: " "
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

/*获取输入的学号 */
  getId : function(e){
    this.setData({
      id: e.detail.value
    })
   
    console.log("id:" + this.data.id)

  },
/*获取输入的密码 */
  getPassward: function(e){
    this.setData({
      password: e.detail.value
    })
   
    console.log("password:" + this.data.password)
  },

/*
  userSubmit: function(){
   var userId = this.data.id
   console.log(userId)
   var userPwd = this.data.password
   console.log(userPwd)
  },
*/

  Submit: function(){
    var that = this;
    wx.request({
      url: 'xxxxxxxxxxxxxxx', /*提交地址？？？ */
      data: {
        /*token: '7b40b56eb2e27195dfcdcc3322312a4eb67229a000000015ea84b8657',*/
        userid:this.data.id,
        password: this.data.password
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.successRemind();
      }
    })
   
  }
})
