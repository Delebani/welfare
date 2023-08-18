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
        orderId = res;
      }
    })
    // 居民签到

    // 商户核销
  }
})
var signin = function (){
  wx.request({
      url: app.globalData.baseUrl + '/wechat/xysq/gyhd/signin',
      method: "POST",
      header: {  
        "Content-Type": "application/json"  
      },  
      data: {
        "bmid": that.data.bmid,
        "czlx": that.data.czlx,
        "img": that.data.img,
        "content":that.data.content,
         "random": that.data.randomcode
      },  
      success: res => {
        var resp = res.data;
        if(200 == resp.code){
          wx.showModal({
            title: '提示',
            content: that.data.qdstatus + '成功',
            showCancel: false,
            confirmText: '确定',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击了确定')
                    //刷新页面
                    pageNum = 1;
                    that.setData({
                        list : [],
                        scrollTop : 0,
                        bottom:false,
                        bmid:null,
                        czlx:null,
                        content:'',
                        signinimg:'/static/img/upload/upload.png',
                        randomcode:'',
                        showModalStatus: false,
                    });
                    loadMore(that);
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
    fail: res => {
      console.log(res);
    }
    })
}