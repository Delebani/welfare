// pages/business/business.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addbusi: false,
    list:[],
    type:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    var type = options.type;
    this.setData({
      type:type,
    })
    // wx.request({
    //   url: app.globalData.baseUrl + '/wechat/system/deptlist',
    //   success: res => {
    //     if(200 == res.code){
    //       this.setData({
    //         list:res.rows,
    //       })
    //     }else{
    //       wx.showModal({
    //           title: '提示',
    //           content: 'res.msg',
    //           showCancel: false,
    //           confirmText: '确定',
    //           success: function (res) {
    //               if (res.confirm) {
    //                   console.log('用户点击了确定')
    //               }
    //           }
    //       })
    //     }
    //   },
    //   fail:res=>{
    //     console.log(res);
    //   }
    // })

    //test
    this.setData({
      list: [{
        "deptId": "203",
        "parentId": "202",
        "deptName": "公益组织1",
        "orderNum": "0"
    },
    {
        "deptId": "205",
        "parentId": "202",
        "deptName": "测试2",
        "orderNum": "2"
    }]
    })

    if(null == this.data.list || 0 == this.data.list.length){
      this.setData({
        addbusi: true
      })
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

    var type = this.data.type;
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
})