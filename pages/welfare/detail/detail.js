// pages/welfare/detail/detail.js
const app = getApp()
var flspId = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    num: 1,
    exchange:false,
    hx:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    flspId = options.flspId;
    // 身份
    var type = wx.getStorageSync('type');
    if(null == type){
      type = 0;
    }
    if(0 == type){
      this.setData({
        exchange:true,
        hx:false,
      })
    }else if(1 == type){
      this.setData({
        exchange:false,
        hx:true,
      })
    }
    wx.request({
      url: app.globalData.baseUrl + '/wechat/xysq/flsp/detail?flspId=' + flspId,
      success: (res) => {
        const resp =  res.data;
        console.log('福利详情---' + resp)
        if(200 == resp.code){
          resp.data.flsp.flspImg = app.globalData.baseUrl + resp.data.flsp.flspImg;
          resp.data.shxx.deptImg = app.globalData.baseUrl + resp.data.shxx.deptImg;
          this.setData({
            detail : resp.data
        });
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
        console.log("获取详情失败" + err)
      }
    })
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
  decrease:function(e){
    if(this.data.num == 1){
      wx.showToast({
        title: '不能再减了~',
        icon:'none'
      })
      return ;
    }
    var Num = this.data.num - 1;
    this.setData({
      num: Num
    })
  },
  increase:function(e){
    var Num = this.data.num + 1;
    this.setData({
      num: Num
    })
  },
  exchange: function(event) {
    console.log(event);
    wx.request({
      url: app.globalData.baseUrl + '/wechat/xysq/flsp/redeem',
      method: "POST",
      header: {  
        "Content-Type": "application/json"  
      },  
      data: {
        "userId": app.globalData.userId,
        "flspId": flspId,
        "orderDhsl": this.data.num//兑换数量
      },  
      success: (res) => {
        var resp = res.data;
        console.log('兑换返回参数---' + resp)
        if(200 == resp.code){
          wx.showModal({
            title: '提示',
            content: '兑换成功',
            showCancel: false,
            confirmText: '确定',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击了确定')
                    wx.navigateBack({
                      delta: 1
                    })
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
        console.log("获取详情失败" + err)
      }
    })
  },
  call:function (event) {
    console.log(event);
    const phoneNumber =  event.currentTarget.dataset.mobile;
    console.log(phoneNumber);
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
    })
  },
  hx: function (event) {
    console.log('商户核销');
    // 调起扫码
    wx.scanCode({
      onlyFromCamera: true,
      success (res) {
        console.log('扫码结果---' + res.result);
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
            adminUserId:app.globalData.userId
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
      }
    })
  }
})