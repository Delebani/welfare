// pages/person/mywelfare/detail/detail.js
const app = getApp();
var orderId = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    orderId = options.orderId;
    // 身份
    var type = wx.getStorageSync('type');
    console.log('身份---'+type)
    if(0 != type){
      wx.switchTab({
        url: '/pages/person/person',
      })
    }
    // wx.request({
    //   url: app.globalData.baseUrl + '/wechat/welfaredetail?orderId' + orderId,
    //   success: (res) => {
    //     console.log('我的福利详情---' + res)
    //     if(200 == res.code){
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

    // test- start
    this.setData({
        detail : {
          "order": {
            "orderId": "1",
            "orderBh": "BH1234",
            "orderXdsj": "2020-02-02 02:02:02",
            "orderDhsl": "1",
            "orderStatus": "待核销",
            "orderYxqs": "2020-02-02",
            "orderYxqz": "2020-02-02",
            "orderQr": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQAAAACoxAthAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAd2KE6QAAAAJcEhZcwAAFxEAABcRAcom8z8AAADtSURBVHja7dZJDsMwCADA/P/TraqUgBc1zZlBimKDxzeEj9fjOBAEQRDkL3IM8dlHdq0hCFIa6Nj/c40gyNpeuZ9qCIIMR+Y9giC/WuzMIAiyIxFBIrepIUhzUqOOpbWGIN3JLnIELRUEaU/Wp9o6mKYWQ5DmJA/ePOEQpC3ZPeHqNeNoQpDeJAfSuq7jaehKBGlM5nE0f3EZgiBjBJwvQBAkihFnpuZzjSBIjJxY1warq+8JBGlPopDDZ3q4XRkEQSqpR3N3XYEgyNJidTzVSxAEGRur8rnhEKQ7qVFhHk+OIL3Js0AQBEGQ23gDLuewDyG+HswAAAAASUVORK5CYII="
           },
           "flxx": {
            "flspId": "1",
            "flspGroup": "福利分组",
            "flspMc": "福利名称",
            "flspSfjf": "2",
            "flspImg": "https://img1.baidu.com/it/u=1458656822,2078909008&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750"
           },
           "shxx": {
            "deptId": "1",
            "deptMc": "这是一个商户",
            "deptImg": "https://pic.616pic.com/photoone/00/00/56/618ce8b3797b76152.jpg",
            "deptDz": "商户地址商户地址商户地址商户地址商户地址商户地址商户地址商户地址商户地址商户地址商户地址商户地址",
            "deptDh": "15012341234"
           }
        }
    });
    // test -end

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

  }
})