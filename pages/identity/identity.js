// pages/identity/identity.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      nickName: app.globalData.userInfo.nickName,
    })
    console.log(options);
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
    }else{
      // 再查下用户有商户没
      wx.login({
        success: (res) => {
          console.log(res);
          var code = res.code
          console.log('code ----' + code);
          wx.getUserInfo({
            success: res => {
              console.log("==iv==" + res.iv)
              console.log("==encryptedData==" + res.encryptedData)
              const encryptedData = res.encryptedData
              const iv = res.iv
              wx.request({
                url: app.globalData.baseUrl + '/wechat/system/user/login',
                method: "POST",
                header: {  
                  "Content-Type": "application/json"  
                },  
                data: {
                  "code": code,
                  "iv": iv,
                  "encryptedData": encryptedData
                },  
                success: res => {
                  console.log(res);
                  var data = res.data;
                  if(200 == data.code){
                    // 获取到用户信息
                    wx.setStorageSync('userInfo', data.data)
                  }else{
                      wx.showModal({
                      title: '提示',
                      content: res.data.msg,
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
          })
        }
      })
      userInfo = wx.getStorageSync('userInfo');
      app.globalData.userInfo = userInfo;
      console.info(app.globalData.userInfo);
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
      }else{
        // 无
        wx.navigateTo({
          url: '/pages/business/business?type='+type,
        })
      }
    }
  }
})