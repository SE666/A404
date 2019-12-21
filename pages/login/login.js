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
  },
/*获取输入的密码 */
  getPassward: function(e){
    this.setData({
      password: e.detail.value
    })
  },

  Submit: function(){
    //var that = this;
    wx.request({
      url: 'http://132.232.121.52/A404_Server/UserServlet?method=login', /*提交地址 */
      data: {
        stuid:this.data.id,
        password: this.data.password
      },
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
       
       console.log(res.data)
       console.log(res.data.flag)
       //管理员成功登录，则跳转页面：
       if(res.data.flag == "1"){
         wx.navigateTo({
           url: '../register/register',
         })
       }else if(res.data.flag == "0"){
         wx.navigateTo({
           url: '../index/index',
         })
       }else{wx.showToast({
           title: '登录失败',
           //icon: fail,
         })
       }
       
      },
      fail: function(res) {}
    })
   
  }
})
