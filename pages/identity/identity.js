// pages/identity/identity.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    var active = null;
    if(options){
      var active = options.active;
    }
    
    if(active){
      this.setData({
        name: app.globalData.userInfo.name,
      })
    }else{
      var type = wx.getStorageSync('type');
      if(type){
        wx.switchTab({
          url: '/pages/index/index',
        })
        return
      }
    }
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
    // console.log('页面关闭');
    // var type = wx.getStorageSync('type');
    // console.log('身份---'+type)
    // if(!type){
    //   console.log('增加缓存');
    //   wx.getStorageSync('type', 0);
    // }
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
  resident: function (event) {
    console.log(event.currentTarget.dataset);
    var type = event.currentTarget.dataset.type;
    console.log('身份---'+ type)
    wx.setStorageSync('type', type);
    wx.switchTab({
      url: '/pages/index/index',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      },fail:function(e){
        console.log(e);
      }
    })
  },
  business: function (event) {
    console.log(event.currentTarget.dataset);
    var type = event.currentTarget.dataset.type;
    console.log('身份---'+ type)
    var userInfo = app.globalData.userInfo;
    if(1 == userInfo.isAdmin && null != userInfo.deptId){
      wx.setStorageSync('type', type);
      wx.switchTab({
        url: '/pages/index/index',
        success: function (e) {
          var page = getCurrentPages().pop();
          if (page == undefined || page == null) return;
          page.onLoad();
        }
      })
    }
    wx.navigateTo({
      url: '/pages/business/business?type='+type,
    })
  }
})