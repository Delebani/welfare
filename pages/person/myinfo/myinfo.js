// pages/person/myinfo/myinfo.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    sexIndex: 0,
    sexArray:[{sex:0,name:'男'},{sex:1,name:'女'},{sex:null,name:'未知'}],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    console.log(app.globalData);
    this.setData({
      userInfo: app.globalData.userInfo
    })
    console.log(this.data.userInfo);
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
  onConfirm: function (event) {
    var name = event.detail.value;
    this.setData({
      "userInfo.name":name
    })
  },
  sexChange:function (event) {
    var sexIndex = event.detail.value;
    var sex = this.data.sexArray[sexIndex].name;
    this.setData({
      "userInfo.sex":sex
    })
  },
  bindDateChange:function (event) {
    var birthday = event.detail.value;
    this.setData({
      "userInfo.birthday":birthday
    })
  },
  save: function (event) {
    // todo 保存个人信息
    wx.showModal({
      title: '提示',
      content: '保存成功',
      complete: (res) => {
        wx.navigateBack({
          delta: 1
        });
      }
    })
  }
})