// pages/scan/scan.js
const app = getApp();
var userid = '';
var qrtype = '';

var qrcode = function(that) {
  console.log('二维码')

  //test
  that.setData({
    qrcode:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQAAAACoxAthAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAd2KE6QAAAAJcEhZcwAAFxEAABcRAcom8z8AAADtSURBVHja7dZJDsMwCADA/P/TraqUgBc1zZlBimKDxzeEj9fjOBAEQRDkL3IM8dlHdq0hCFIa6Nj/c40gyNpeuZ9qCIIMR+Y9giC/WuzMIAiyIxFBIrepIUhzUqOOpbWGIN3JLnIELRUEaU/Wp9o6mKYWQ5DmJA/ePOEQpC3ZPeHqNeNoQpDeJAfSuq7jaehKBGlM5nE0f3EZgiBjBJwvQBAkihFnpuZzjSBIjJxY1warq+8JBGlPopDDZ3q4XRkEQSqpR3N3XYEgyNJidTzVSxAEGRur8rnhEKQ7qVFhHk+OIL3Js0AQBEGQ23gDLuewDyG+HswAAAAASUVORK5CYII=',
  })
  //test


  // var type = wx.getStorageSync('type');
  // wx.request({
  //   url: app.globalData.baseUrl + '/wechat/qrcode?userId'+ userid +'&type='+type+'qrtype'+qrtype,
  //   success: res => {
  //     if(200 == res.code){
  //       that.setData({
  //         qrcode:res.qrcode,
  //       })
  //     }
  //   }
  // })
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
    userid = app.globalData.userid;
    this.setData({
      name:app.globalData.userInfo.name,
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
  }
})