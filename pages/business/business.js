// pages/business/business.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // addbusi: false,
    list:[],
    type:null,
    nickName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    var type = options.type;
    this.setData({
      type:type,
      nickName: app.globalData.userInfo.nickName,
    })
    wx.request({
      url: app.globalData.baseUrl + '/wechat/system/dept/list',
      success: res => {
        var resp = res.data
        if(200 == resp.code){
          this.setData({
            list:resp.rows,
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
      fail:res=>{
        console.log(res);
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
  addbusi: function (event) {
    console.log('增加商户')
    wx.navigateTo({
      url: '/pages/',
    })
  },
  choose: function (event) {
    console.log(event.currentTarget.dataset);
    var deptId = event.currentTarget.dataset.deptid;

    wx.request({
      url: app.globalData.baseUrl + '/wechat/system/user/admin',
      method: "POST",
      header: {  
        "Content-Type": "application/json"  
      },
      data: {
        userId:app.globalData.userId,
        deptId:deptId
      },
      success: res => {
        var resp = res.data;
        if(200 == resp.code){
          wx.showModal({
            title: '提示',
            content: '申请成功，等待审核',
            showCancel: false,
            confirmText: '确定',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击了确定')
                    wx.switchTab({
                      url: '/pages/index/index',
                      success: function (e) {
                        var page = getCurrentPages().pop();
                        if (page == undefined || page == null) return;
                        page.onLoad();
                      }
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
        // var type = this.data.type;
        // wx.setStorageSync('type', type);
        
      },
      fail: res => {
        console.log(res);
      }
    })
  }
})