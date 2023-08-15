// pages/activity/myactivity/myactivity.js
const app = getApp()
var userId = null;
var pageNum  = 1;
var pageSize = 10;
var total = 0;

// 请求数据
var loadMore = function(that){
  that.setData({
      hidden:false
  });
  if(that.data.bottom){
    that.setData({
        hidden:true
    });
    return
  }
  // wx.request({
  //   url: app.globalData.baseUrl + '/wechat/myactivities',
  //   method: "POST",
  //   header: {  
  //     "Content-Type": "application/x-www-form-urlencoded"  
  //   },  
  //   data: {
  //     "pageNum": pageNum,
  //     "pageSize": pageSize,
  //     "userId": userId
  //   },  
  //   success: res => {
  //     if(200 == res.code){
  //        total = res.data.total;
  //       //将搜索结果存储在searchResults中
  //       console.info(that.data.list);
  //         var list = that.data.list;
  //         for(var i = 0; i < res.data.rows.length; i++){
                // if(testlist[i].gyhdStatus == '未开始'){
                //   testlist[i].statusUrl = '/static/img/status/nostart.png'
                // }else if(testlist[i].gyhdStatus == '进行中'){
                //   testlist[i].statusUrl = '/static/img/status/ongoing.png'
                // }else if(testlist[i].gyhdStatus == '已结束'){
                //   testlist[i].statusUrl = '/static/img/status/ended.png'
                // }
  //             list.push(res.rows.list[i]);
  //         }
  //         that.setData({
  //             list : list
  //         });
          
  //         that.setData({
  //             hidden:true
  //         });
  //       if(total > pageSize * pageNum){
  //         pageNum ++;
  //       }else{
  //         that.setData({
  //           bottom: true
  //         })
  //       }
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
  //   fail: res => {
  //     console.log(res);
  //   }
  // })
  var list = that.data.list;
  var testlist = [{
    "gyhdId":1,
    "bmid":1,
    "gyhdMc":"活动名称",
    "gyhdStatus":"进行中",
    "gyhdHdsjKs":"2023-08-01",
    "gyhdImg":"https://img2.baidu.com/it/u=638285213,1746517464&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
    "qdstatus":"签到"
   },{
    "gyhdId":2,
    "bmid":2,
    "gyhdMc":"活动名称2",
    "gyhdStatus":"已结束",
    "gyhdHdsjKs":"2023-08-01",
    "gyhdImg":"https://img1.baidu.com/it/u=2812417321,4100104782&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    "qdstatus":"打卡"
   }]
          for(var i = 0; i < testlist.length; i++){
            if(testlist[i].gyhdStatus == '未开始'){
              testlist[i].statusUrl = '/static/img/status/nostart.png'
            }else if(testlist[i].gyhdStatus == '进行中'){
              testlist[i].statusUrl = '/static/img/status/ongoing.png'
            }else if(testlist[i].gyhdStatus == '已结束'){
              testlist[i].statusUrl = '/static/img/status/ended.png'
            }
            list.push(testlist[i]);
          }
          console.log(testlist)
          that.setData({
              list : list
          });
          
          that.setData({
              hidden:true
          });
        if(total > pageSize * pageNum){
          pageNum ++;
        }else{
          that.setData({
            bottom: true
          })
        }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    list:[],
    scrollTop : 0,
    scrollHeight:0,
    bottom: false,
    qdstatus:null,
    showModalStatus: false,
    bmid:null,
    czlx:null,
    content:'',
    signinimg:'/static/img/upload/upload.png',
    randomcode:'',
    signinbtn: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 身份
    var type = wx.getStorageSync('type');
    if(null == type){
      type = 0;
    }
    if(0 == type){
      this.setData({
        signinbtn:true,
      })
    }else if(1 == type){
      this.setData({
        signinbtn:false,
      })
    }

    userId = app.globalData.userInfo.userId;
    //   这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    var that = this;
    wx.getSystemInfo({
        success:function(res){
            that.setData({
                scrollHeight:res.windowHeight
            });
        }
    });
    loadMore(that);
  },
  //页面滑动到底部
  bindDownLoad:function(){   
    console.log('--------加载更多-------')
      var that = this;
      loadMore(that);
  },
  scroll:function(event){
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
     this.setData({
         scrollTop : event.detail.scrollTop
     });
  },
  topLoad:function(event){
    console.log('--------上拉刷新-------')
      pageNum = 1;
      this.setData({
          list : [],
          scrollTop : 0,
          bottom:false
      });
      var that = this;
      loadMore(that);
  },
  detail: function (event) {
    console.log(event.currentTarget.dataset);
    const gyhdId = event.currentTarget.dataset.gyhdid;
    console.log('--详情--'+ gyhdId)
    wx.navigateTo({
      url: '/pages/activity/detail/detail?gyhdId='+gyhdId,
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
  signin: function (event) {
    console.log(event.currentTarget.dataset);
    const qdstatus = event.currentTarget.dataset.qdstatus;
    const bmid = event.currentTarget.dataset.bmid;
    console.log('报名id---' + bmid +'--动作--'+ qdstatus);
    if('已完成' == qdstatus){
      return
    }
    var czlx = null;
    if('签到' == qdstatus){
      czlx=0;
    }else if('签退' == qdstatus){
      czlx=1;
    }else if('打卡' == qdstatus){
      czlx=2;
    }
    this.setData({
      qdstatus:qdstatus,
      bmid:bmid,
      czlx:czlx,
    })
    if('打卡' == qdstatus){
      this.setData({
        showModalStatus: true
      })
    }else{
      var that = this;
      wx.scanCode({
        onlyFromCamera: true,
        needResult: 1,
        scanType: ['barCode', 'qrCode'],
        success (res) {
          console.log('扫码结果---' + res.result);
          that.setData({
            randomcode:res.result
          })
          // 签到签退
          signinfun(that)
        }
      })
    }
  },
  confirm: function (event) {
    var that = this;
    signinfun(that)
  },
  cancel: function (event) {
    this.setData({
      showModalStatus: false
    })
  },
  content: function (event) {
    var that = this;
    console.log(event.detail.value)
    that.setData({
      content: event.detail.value
     })
  },
  chooseimage: function (event) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
       console.log(res.tempFilePaths);
       that.setData({
        signinimg: res.tempFilePaths
       })
      }
     })
  }
})
function signinfun(that) {
  console.log(that.data)
  // 签到打卡成功
    // wx.request({
    //   url: app.globalData.baseUrl + '/wechat/signin',
    //   method: "POST",
    //   header: {  
    //     "Content-Type": "application/x-www-form-urlencoded"  
    //   },  
    //   data: {
    //     "bmid": that.data.bmid,
    //     "czlx": that.data.czlx,
    //     "img": that.data.img,
    //     "content":that.data.content,
    //      "randomcode": that.data.randomcode
    //   },  
    //   success: res => {
    //     if(200 == res.code){
    //       wx.showModal({
    //         title: '提示',
    //         content: that.data.qdstatus + '成功',
    //         showCancel: false,
    //         confirmText: '确定',
    //         success: function (res) {
    //             if (res.confirm) {
    //                 console.log('用户点击了确定')
    //                 //刷新页面
    //                 pageNum = 1;
    //                 that.setData({
    //                     list : [],
    //                     scrollTop : 0,
    //                     bottom:false
    //                 });
    //                 loadMore(that);
    //             }
    //         }
    //     })
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
    //   }
    // },
    // fail: res => {
    //   console.log(res);
    // }
    // })
    // 假装成功 -start
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
                  bottom:false
              });
              loadMore(that);
          }
      }
  })
    // 假装成功 -end
    that.setData({
      showModalStatus: false,
      content:'',
      signinimg:'/static/img/upload/upload.png',
      randomcode:'',
    })
}