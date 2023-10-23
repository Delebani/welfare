// pages/activity/myactivity/myactivity.js
const app = getApp()
var userId = null;
var pageNum  = 1;
var pageSize = 10;
var total = 0;

// 请求数据
var loadMore = function(that){
  // that.setData({
  //     hidden:false
  // });
  //if(that.data.bottom){
    // that.setData({
    //     hidden:true
    // });
  //}
  wx.request({
    url: app.globalData.baseUrl + '/wechat/xysq/gyhd/myactivities?pageNum='+pageNum+'&pageSize='+pageSize+'&userId='+userId,
    success: res => {
      var resp = res.data;
      if(200 == resp.code){
         total = resp.total;
        //将搜索结果存储在searchResults中
        console.info(that.data.list);
          var list = that.data.list;
          for(var i = 0; i < resp.rows.length; i++){
            if(resp.rows[i].gyhdStatus == '未开始'){
              resp.rows[i].gyhdStatusBack = 'grey'
            }else if(resp.rows[i].gyhdStatus == '进行中'){
              resp.rows[i].gyhdStatusBack = '#07c160'
            }else if(resp.rows[i].gyhdStatus == '已结束'){
              resp.rows[i].gyhdStatusBack = 'red'
            }
            resp.rows[i].gyhdImg = app.globalData.baseUrl +  resp.rows[i].gyhdImg;
            list.push(resp.rows[i]);
          }
          that.setData({
              list : list
          });
          
          
        if(total > pageSize * pageNum){
          pageNum ++;
        }else{
          that.setData({
            bottom: true
          })
        }
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
    fail: res => {
      console.log(res);
    }
  })
//   that.setData({
//     hidden:true
// });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //hidden:true,
    list:[],
    // scrollTop : 0,
    // scrollHeight:0,
    bottom: false,
    qdstatus:null,
    showModalStatus: false,
    bmid:null,
    czlx:null,
    content:'',
    signinimgurl:'/static/img/upload/upload.png',
    signinimg:'',
    randomcode:'',
    adminUserId:'',
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
    // wx.getSystemInfo({
    //     success:function(res){
    //         that.setData({
    //             scrollHeight:res.windowHeight
    //         });
    //     }
    // });
    var that = this;
    loadMore(that);
  },
   /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    console.log('--------上拉刷新-------')
    pageNum = 1;
    this.setData({
      list : [],
      bottom:false
    });
    var that = this;
    loadMore(that);
    wx.stopPullDownRefresh();
  },
  /**
   * 监听用户上拉触底事件
   */
  onReachBottom(){
    console.log('--------加载更多-------')
    if(this.data.bottom){
      wx.showToast({
        title: '已经到底了啦~',
        icon: 'success',
        duration: 2000,      // 2秒
      });
      return
    }
    wx.showLoading({ title: '加载中...', })
    var that = this;
    loadMore(that);
    wx.hideLoading();
  },
  //页面滑动到底部
  // bindDownLoad:function(){   
  //   console.log('--------加载更多-------')
  //     var that = this;
  //     loadMore(that);
  // },
  // scroll:function(event){
  //   //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
  //    this.setData({
  //        scrollTop : event.detail.scrollTop
  //    });
  // },
  // topLoad:function(event){
  //   console.log('--------上拉刷新-------')
  //     pageNum = 1;
  //     this.setData({
  //         list : [],
  //         scrollTop : 0,
  //         bottom:false
  //     });
  //     var that = this;
  //     loadMore(that);
  // },
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
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  signin: function (event) {
    console.log(event.currentTarget.dataset);
    const qdstatus = event.currentTarget.dataset.qdstatus;
    const gyhdstatus = event.currentTarget.dataset.gyhdstatus;
    if('已结束' == gyhdstatus){
      wx.showModal({
        title: '提示',
        content: '活动已结束',
        showCancel: false,
        confirmText: '确定',
        success: function (res) {
            if (res.confirm) {
                console.log('用户点击了确定')
            }
        }
      })
      return
    }
    const bmid = event.currentTarget.dataset.bmid;
    console.log('报名id---' + bmid +'--动作--'+ qdstatus);
    if('已完成' == qdstatus || '活动结束' == qdstatus){
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
      that.setData({
        content:'',
        signinimgurl:'/static/img/upload/upload.png',
        signinimg:'',
        randomcode:'',
    });
      wx.scanCode({
        onlyFromCamera: true,
        needResult: 1,
        scanType: ['barCode', 'qrCode'],
        success (res) {
          console.log('扫码结果---' + res.result);
          const result =  JSON.parse(res.result);
          that.setData({
            randomcode:result.random,
            adminUserId:result.id
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
  inputcontent:function(event){
    var that = this;
    console.log(event.detail.value)
    that.setData({
      content: event.detail.value
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
    wx.showLoading({ title: '上传中...', })
    var that = this;
    wx.chooseMedia({
      count: 1, // 默认9 
      mediaType: 'image',
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
       console.log(res.tempFiles[0].tempFilePath);
       that.setData({
        signinimgurl: res.tempFiles[0].tempFilePath,
      })
       wx.uploadFile({
        url: app.globalData.baseUrl + '/wechat/system/upload',
        filePath: res.tempFiles[0].tempFilePath,
        name: 'file',
        complete(){
          wx.hideLoading();
        },
        success (res){
          console.log('上传文件响应--'+ res);
          var resp = JSON.parse(res.data);
          console.log('上传文件响应resp--'+ resp);
            if(200 == resp.code){
                wx.showModal({
                  title: '提示',
                  content: '上传成功',
                  showCancel: false,
                  confirmText: '确定',
                  success: function (res) {

                    that.setData({
                      // signinimgurl: app.globalData.baseUrl + resp.fileName,
                      signinimg:resp.fileName,
                    })
                  }
              })
            }else{
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false,
                confirmText: '确定',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击了确定')
                    }
                }
            })
          }
        },fail: res => {
          console.log(res);
        }
      })
      }
     })
  }
})
function signinfun(that) {
  console.log(that.data)
  // 签到打卡成功
    wx.request({
      url: app.globalData.baseUrl + '/wechat/xysq/gyhd/signin',
      method: "POST",
      header: {  
        "Content-Type": "application/json"  
      },  
      data: {
        "bmId": that.data.bmid,
        "czlx": that.data.czlx,
        "img": that.data.signinimg,
        "content":that.data.content,
         "random": that.data.randomcode,
         "adminUserId": that.data.adminUserId
      },  
      success: res => {
        var resp = res.data;
        if(200 == resp.code){
          wx.showModal({
            title: '提示',
            content: that.data.qdstatus + '成功',
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
    fail: res => {
      console.log(res);
    }
    })
    //刷新页面
    pageNum = 1;
    that.setData({
        list : [],
        scrollTop : 0,
        bottom:false,
        bmid:null,
        czlx:null,
        content:'',
        signinimgurl:'/static/img/upload/upload.png',
        signinimg:'',
        randomcode:'',
        showModalStatus: false,
    });
    loadMore(that);
}