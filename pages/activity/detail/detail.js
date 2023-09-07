// pages/activity/detail/detai.js
const app = getApp()
var gyhdId = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    enrty:false,
    signincode:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    gyhdId = options.gyhdId;

    // 身份
    var type = wx.getStorageSync('type');
    if(null == type){
      type = 0;
    }
    if(0 == type){
      this.setData({
        enrty:true,
        signincode:false,
      })
    }else if(1 == type){
      this.setData({
        enrty:false,
        signincode:true,
      })
    }
    wx.request({
      url: app.globalData.baseUrl + '/wechat/xysq/gyhd/detail?hdId=' + gyhdId,
      success: (res) => {
        console.log('活动详情---' + res)
        var resp = res.data;
        if(200 == resp.code){
            if('进行中' == resp.data.status){
              resp.data.status = '报名';
            }
            resp.data.img = app.globalData.baseUrl + resp.data.img;
            let hdkc = resp.data.hdkc // 后台返回的富文本值
            if(null != hdkc){
              hdkc = hdkc.replace(/;\swidth\s:\s*/g, ';max-width:100%;');
              hdkc = hdkc.replace(/<img[^>]>/gi, (match, capture) => {
              return match.replace(/style\s?=\s*?([‘"])[\s\S]*?\1/ig, 'style="max-width:100%!important;height:auto;display:block"')
              });
              hdkc = hdkc.replace(/<p/gi, '<p style="width:100%;height:auto;display:block;white-space:pre-wrap;word-wrap:break-word" '),
              hdkc = hdkc.replace(/<img/gi, '<img style="width:100%;height:auto;display:block;" '),
              resp.data.hdkc = hdkc;
            }
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
  entry: function(event) {
    console.log(event);
    var status = event.currentTarget.dataset.status;
    if('报名' != status){
      return;
    }

    wx.request({
      url: app.globalData.baseUrl + '/wechat/xysq/gyhd/enlists',
      method: "POST",
      header: {  
        "Content-Type": "application/json"  
      },  
      data: {
        "userId": app.globalData.userId,
        "gyhdId": gyhdId,
      },  
      success: (res) => {
        console.log('报名返回参数---' + res)
        var resp = res.data;
        if(200 == resp.code){
          wx.showModal({
            title: '提示',
            content: '报名成功',
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
        console.log("报名接口调用失败" + err)
      }
    })
  },
  signincode: function (event) {
    console.log('签到码');

    wx.navigateTo({
      url: '/pages/scan/scan?qrtype=2',
    })
  }
})