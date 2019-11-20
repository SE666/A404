// pages/login/login.js
const ctx = wx.createCanvasContext("firstCanvas")//the context of Canvas 
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {    
   // var loginFrame = this.roundRect(40, 130, 240, 190,30)
  //  ctx.draw()
    this.roundRect(40, 130, 240, 190, 30)
    this.font()
    
    //this.button()
    ctx.draw()

  
  },
 
  /**
 * 绘制圆角矩形
 * @param {Object} ctx - canvas组件的绘图上下文
 * @param {Number} x - 矩形的x坐标
 * @param {Number} y - 矩形的y坐标
 * @param {Number} w - 矩形的宽度
 * @param {Number} h - 矩形的高度
 * @param {Number} r - 矩形的圆角半径
 * @param {String} [c = 'transparent'] - 矩形的填充色
 */
  roundRect: function (x, y, w, h, r, c = 'rgba(208,233,225, 0.8)') {
    if (w < 2 * r) { r = w / 2; }
    if (h < 2 * r) { r = h / 2; }

    ctx.beginPath();
    ctx.fillStyle = c;
  
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.lineTo(x + w, y + r);

    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
    ctx.lineTo(x + w, y + h - r);
    ctx.lineTo(x + w - r, y + h);

    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);
    ctx.lineTo(x + r, y + h);
    ctx.lineTo(x, y + h - r);

    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
    ctx.lineTo(x, y + r);
    ctx.lineTo(x + r, y);
    ctx.fill();
    ctx.closePath();
    
  },

  font : function(){
    ctx.font = '11px bold 黑体';
    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";
   
    ctx.setStrokeStyle('black');

    ctx.fillText("请使用OUC教务处密码登录", 80, 250);

  },

  button : function(){
    var btnQR = new button();
    btnQR.Content = "确认";
    ctx.AddVisual(btn);
    ctx.SetLeft(btn, 100);
    ctx.SetTop(btn, 200); 

  }
})