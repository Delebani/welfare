// pages/scan/scan.js
const app = getApp();
var userId = '';
var qrtype = '';

var qrcode = function(that) {
  console.log('二维码')


  var type = wx.getStorageSync('type');
  wx.request({
    url: app.globalData.baseUrl + '/wechat/qrcode?userId='+ userId +'&type='+type+'&qrtype='+qrtype,
    success: res => {
      var resp = res.data;
      if(200 == resp.code){
        that.setData({
          qrcode: app.globalData.baseUrl+ resp.data,
        })
      }else{
        wx.showModal({
          title: '提示',
          content: resp.msg,
          showCancel: false,
          confirmText: '确定',
          success: function (res) {
              if (res.confirm) {
                  console.log('用户点击了确定')
              }
          }
      })
      }
    },
    fail: function (err) {
          console.log("二维码获取失败" + err)
        }
    
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    jf:'',
    qrcode:'',
    resident: false,
    business: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 身份
    var type = wx.getStorageSync('type');
    console.log('身份---'+type)
    if(0 == type){
      this.setData({
        resident:true,
        business:false,
      })
    }else{
      this.setData({
        resident:false,
        business:true,
      })
    }
    console.log(options);
    qrtype = options.qrtype;
    userId = app.globalData.userId;
    this.setData({
      name:app.globalData.userInfo.nickName,
      jf:app.globalData.userInfo.jf,
    });
    var that =this;
    qrcode(that);
  },
  refresh: function (event) {
    var that =this;
    qrcode(that);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.onLoad();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  scan: function (event) {
    wx.scanCode({
      onlyFromCamera: true,
      needResult: 1,
      scanType: ['barCode', 'qrCode'],
      success (res) {
        console.log('扫码结果---' + res.result);
        var type = wx.getStorageSync('type');
        if(0== type){
          // 居民-签到（应该在活动处点击签到扫码）
          wx.showModal({
            title: '提示',
            content: '请在首页-我的活动中选择活动，点击签到/签退按钮扫码',
            showCancel: false,
            confirmText: '确定',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击了确定')
                }
            }
        })
        }else if(1 == type){
          // 商户-核销
          const result =  JSON.parse(res.result);
        var orderId = result.orderId;
        var random =  result.random;
        wx.request({
          url: app.globalData.baseUrl + '/wechat/xysq/flsp/order/verification',
          method: "POST",
          header: {  
            "Content-Type": "application/json"  
          },  
          data: {
            orderId: orderId,
            random: random,
          }, 
          success: (res) => {
            var resp = res.data;
            console.log(res)
            if(200 == resp.code){
              wx.showModal({
                  title: '提示',
                  content: '核销成功',
                  showCancel: false,
                  confirmText: '确定',
                  success: function (res) {
                      if (res.confirm) {
                          console.log('用户点击了确定')
                      }
                  }
              })
            }else{
              wx.showModal({
                title: '提示',
                content: resp.msg,
                showCancel: false,
                confirmText: '确定',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击了确定')
                    }
                }
            })
            }
          },
          fail: function (err) {
                console.log("核销失败" + err)
              }
        })
        }else{
          return;
        }
        
        
      }
    })
  }
})

