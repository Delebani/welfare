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

    // 假定成功
    this.setData({
      detail : {
        "gyhdId":1,
        "deptId":1,
        "gyhdMc":"活动名称",
        "gyhdMs":"活动描述",
        "gyhdGz":"活动规则",
        "gyhdRsxz":"9",
        "gyhdCyrs":"9",
        "gyhdjf":"0",
        "bmkssj":"报名开始时间",
        "bmjssj":"报名结束时间",
        "hdkssj":"活动开始时间",
        "hdjssj":"活动结束时间",
        "deptName":"主办方名称",
        "hddz":"活动地址",
        "cytj":"参与条件",
        "hddx":"活动对象",
        "hdkc":"活动流程",
        "zysx":"注意事项",
        "hdzb":"活动组别",
        "status":"报名",
        "img":"https://img1.baidu.com/it/u=2812417321,4100104782&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
        "fbsj":"发布时间"
      }
    })
    // wx.request({
    //   url: app.globalData.baseUrl + '/wechat/activitiesdetail?gyhdId' + gyhdId,
    //   success: (res) => {
    //     console.log('活动详情---' + res)
    //     if(200 == res.code){
            // if('进行中' == res.data.status){
            //   res.data.status = '报名';
            // }
    //       this.setData({
    //         detail : res.data
    //     });
    //     }else{
    //       wx.showModal({
    //         title: '提示',
    //         content: 'res.msg',
    //         showCancel: false,
    //         confirmText: '确定',
    //         success: function (res) {
    //             if (res.confirm) {
    //                 console.log('用户点击了确定')
    //             }
    //         }
    //     })
    //     }
    //   },
    //   fail: function (err) {
    //     console.log("获取详情失败" + err)
    //   }
    // })
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
    //test 报名
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
    //test 报名

    // wx.request({
    //   url: app.globalData.baseUrl + '/wechat/enlists',
    //   method: "POST",
    //   header: {  
    //     "Content-Type": "application/x-www-form-urlencoded"  
    //   },  
    //   data: {
    //     "userId": app.globalData.userid,
    //     "hdId": gyhdId,
    //   },  
    //   success: (res) => {
    //     console.log('报名返回参数---' + res)
    //     if(200 == res.code){
    //       wx.showModal({
    //         title: '提示',
    //         content: '报名成功',
    //         showCancel: false,
    //         confirmText: '确定',
    //         success: function (res) {
    //             if (res.confirm) {
    //                 console.log('用户点击了确定')
    //                 wx.navigateBack({
    //                   delta: 1
    //                 })
    //             }
    //         }
    //       })
    //     }else{
    //       wx.showModal({
    //         title: '提示',
    //         content: 'res.msg',
    //         showCancel: false,
    //         confirmText: '确定',
    //         success: function (res) {
    //             if (res.confirm) {
    //                 console.log('用户点击了确定')
    //             }
    //         }
    //     })
    //     }
    //   },
    //   fail: function (err) {
    //     console.log("获取详情失败" + err)
    //   }
    // })
  },
  signincode: function (event) {
    console.log('签到码');

    wx.navigateTo({
      url: '/pages/scan/scan?qrtype=2',
    })
  }
})