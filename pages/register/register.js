// pages/login-admin/login-admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    send:true,/*用来控制 发送验证码按钮 是否可用 */
    alreadySend:false,
    second:60,
    disabled: true,
    xuehao:'',
    name: '',
    phoneNumber:'',
    code:'',
    password:'',
    disabled: false,
  },

  onLoad: function(){
    this.setData({
      btnText: '发'
    })

  },

  onReady: function (){
    /*在onReady获取服务器端的sessionId, 并存储到本地缓存中  每次发起http请求时在header中构造: "Cookie": sessionId */
    /* 
    wx.request({
      url: '',
      header:{
        "Content-Type": " "
      },
      method: 'POST',
      success: function(res){
        wx.setStorageSync('sessionId', 'JSESSIONID=' + res.data)
      }
    })
*/
  },

/*输入学号 */
  getXueHao: function(e){
    this.setData({
      xuehao: e.detail.value
    })
  },
/*输入姓名 */
  getName: function(e){
    this.setData({
      name: e.detail.value
    })

  },

/*输入手机号 */
  getPhoneNumber: function(e){
    this.setData({
      phoneNumber: e.detail.value
    })
  },

/*检查手机号是否正确 */
  checkPhoneNumber: function(phoneNumber){
    let str = /^1\d{10}$/
    if (str.test(phoneNumber)) {
      return true
    } else 
        return false
  },


  /*发送验证码*/
  sendCode: function(){
    let chkresult = false
    if(this.data.phoneNumber.length == 11){
      chkresult = this.checkPhoneNumber(this.data.phoneNumber)
    }
    console.log("chkresult = "+ chkresult)
    if(chkresult){  /*号码11位且格式正确 */
    /*
      var sessionId = wx.getStorageSync('sessionId')
      var phoneNumber = this.data.phoneNumber
      wx.request({
        url: 'http://132.232.121.52/A404_Server/AdminServlet?method=',
        data:{
          phonenum: phoneNumber
        },
        header:{
          "Content-Type": " ",
          "Cookie": sessionId
        },
        method:"POST",
        success:function(res){
          console.log(res)
        }
      })  */
      /*点击 发送验证码后， 控制按钮显示秒数 */
      this.setData({
        alreadySend: true,
        send: false,
        disabled: true,
      })
      /*启动计时器 */
      this.timer()
    }else{
        wx.showToast({
        title: '手机号不正确',
        image: '/pages/image/login-bg.png'
      })
    }
    
  },

/*计时器 */
  timer:function(){
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          this.setData({
            second: this.data.second -1
          })
          if(this.data.second <= 0){
            this.setData({
              second:60,
              alreadySend: false,
              send:true,
              disabled:false,
            })
            resolve(setTimer)
          }
        }
      , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
/*输入验证码 */
  getCode:function(e){
    this.setData({
      code: e.detail.value
    })

  },
  /*输入密码 */
  getPassword: function(e){
    this.setData({
      password: e.detail.value
    })
  },

  /*提交表单 */
  formSubmit: function(){
    var xuehao = this.data.xuehao
    var name = this.data.name
    var phoneNumber = this.data.phoneNumber
    var code = this.data.code
    var password = this.data.password
    var sessionId = wx.getStorageSync('sessionId')
    
    if(xuehao && name && phoneNumber && code && password){
      wx.request({
        url: 'http://132.232.121.52/A404_Server/UserServlet?method=register',
        data: {
          stuid: xuehao,
          username: name,
          phone: phoneNumber,
          code: code,
          password: password
        },
        header:{
          'content-type': 'application/x-www-form-urlencoded'
          //"Cookie": sessionId
        },
        method: "POST",
        success: function(res){
          console.log("res:" + res.data)
          if ((parseInt(res.statusCode) == 200) && res.data == "1"){
            wx.showToast({
              title: 'success',
            })
            //注册成功后页面跳转
            wx.navigateTo({
              url: '../login/login',
            })
          }else{
            wx.showToast({
              title: "res.data.message",
              //image:" "
              
            })
          }
        },

        fail: function(res){
          console.log(res)
        }
      })

    }else{
      wx.showToast({
        title: '注册信息错误',
        icon: "waiting"
      })
    }
  }
})