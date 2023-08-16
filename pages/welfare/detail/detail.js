// pages/welfare/detail/detail.js
const app = getApp()
var flspId = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    num: 1,
    exchange:false,
    hx:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    flspId = options.flspId;
    // 身份
    var type = wx.getStorageSync('type');
    if(null == type){
      type = 0;
    }
    if(0 == type){
      this.setData({
        exchange:true,
        hx:false,
      })
    }else if(1 == type){
      this.setData({
        exchange:false,
        hx:true,
      })
    }
    // 假定成功
    this.setData({
      detail : {
        "flsp": {
            "flspId": 1,
            "flspMc": "福利名称",
            "flspJf": "20",
            "flspJg": "200",
            "flspKc": 0,
            "flspXl": 0,
            "flspImg": "https://img1.baidu.com/it/u=1458656822,2078909008&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750",
            "flspXg": 0,
            "flspHxyxq": "2023-08-01至2023-08-03",
            "flspGroup": "福利分组"
        },
        "shxx": {
            "deptId": "商户id",
            "deptMc": "商户名称",
            "deptImg": "https://pic.616pic.com/photoone/00/00/56/618ce8b3797b76152.jpg",
            "deptDz": "商户地址商户地址商户地址商户地址商户地址商户地址商户地址商户地址商户地址商户地址商户地址商户地址",
            "deptDh": "15012341234"
        }
    }
    })
    // wx.request({
    //   url: app.globalData.baseUrl + '/wechat/welfaredetail?flspId' + flspId,
    //   success: (res) => {
    //     console.log('福利详情---' + res)
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
  decrease:function(e){
    if(this.data.num == 1){
      wx.showToast({
        title: '不能再减了~',
        icon:'none'
      })
      return ;
    }
    var Num = this.data.num - 1;
    this.setData({
      num: Num
    })
  },
  increase:function(e){
    var Num = this.data.num + 1;
    this.setData({
      num: Num
    })
  },
  exchange: function(event) {
    console.log(event);
    wx.request({
      url: app.globalData.baseUrl + '/wechat/redeem',
      method: "POST",
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
      data: {
        "userId": app.globalData.userid,
        "flspId": flspId,
        "spddDhsl": this.data.num//兑换数量
      },  
      success: (res) => {
        console.log('兑换返回参数---' + res)
        if(200 == res.code){
          wx.showModal({
            title: '提示',
            content: '兑换成功',
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
            content: 'res.msg',
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
  call:function (event) {
    console.log(event);
    const phoneNumber =  event.currentTarget.dataset.mobile;
    console.log(phoneNumber);
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
    })
  },
  hx: function (event) {
    console.log('商户核销');
    // 调起扫码
    var orderId = '';
    wx.scanCode({
      onlyFromCamera: true,
      success (res) {
        console.log('扫码结果---' + res);
        orderId = res;
      }
    })
    
    wx.request({
      url: '/wechat/verification',
      success: (res) => {
        console.log(res)
        if(200 == res.code){
          wx.showModal({
              title: '提示',
              content: '核销成功',
              showCancel: false,
              confirmText: '确定',
              success: function (res) {
                  if (res.confirm) {
                      console.log('用户点击了确定')
                  }
              }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: res.msg,
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
            console.log("核销失败" + err)
          }
    })
  }
})