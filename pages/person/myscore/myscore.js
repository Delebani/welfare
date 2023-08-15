// pages/person/myscore/myscore.js
const app=getApp()
var pageNum  = 1;
var pageSize = 10;
var total = 0;
var userId = 0;
var bglx = null;
var bgqd = null;

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
  //   url: app.globalData.baseUrl + '/wechat/individual points',
  //   method: "POST",
  //   header: {  
  //     "Content-Type": "application/x-www-form-urlencoded"  
  //   },  
  //   data: {
  //     "pageNum": pageNum,
  //     "pageSize": pageSize,
  //     "userId": userId,
  //     "bglx": bglx,
  //     "bgqd": bgqd
  //   },  
  //   success: res => {
  //     if(200 == res.code){
  //        total = res.data.total
  //       //将搜索结果存储在searchResults中
  //       console.info(that.data.list);
  //         var list = that.data.list;
  //         for(var i = 0; i < res.data.rows.length; i++){
                // if(testlist[i].bglx == 0){
                //   testlist[i].bglxtxt = '积分支出'
                // }else if(testlist[i].gyhdStatus == 1){
                //   testlist[i].statusUrl = '积分收入'
                // }
                // switch(testlist[i].bgqd){
                //   case 0:
                //     testlist[i].bgqdtxt = '公益活动获取';
                //     break;
                //   case 1:
                //     testlist[i].bgqdtxt = '打卡活动获取';
                //     break;
                //   case 2:
                //     testlist[i].bgqdtxt = '兑换商品';
                //     break;
                //   case 3:
                //     testlist[i].bgqdtxt = '订单退单';
                //     break;
                //   case 4:
                //     testlist[i].bgqdtxt = '积分过期';
                //     break;
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
    "pointId":1,
    "userId":1,
    "czmc": "使用",
    "czsk":'2020-02-02 02:02:02',
    "bglx": 0,
    "bgqd": 0,
    "jf":0
    },{
      "pointId":2,
      "userId":2,
      "czmc": "使用",
      "czsk":'2020-02-02 02:02:02',
      "bglx": 1,
      "bgqd": 1,
      "jf":1
   }]
          for(var i = 0; i < testlist.length; i++){
            if(testlist[i].bglx == 0){
              testlist[i].bglxtxt = '积分支出'
            }else if(testlist[i].bglx == 1){
              testlist[i].bglxtxt = '积分收入'
            }
            switch(testlist[i].bgqd){
              case 0:
                testlist[i].bgqdtxt = '公益活动获取';
                break;
              case 1:
                testlist[i].bgqdtxt = '打卡活动获取';
                break;
              case 2:
                testlist[i].bgqdtxt = '兑换商品';
                break;
              case 3:
                testlist[i].bgqdtxt = '订单退单';
                break;
              case 4:
                testlist[i].bgqdtxt = '积分过期';
                break;
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

  data: {
    score:{},
    hidden:true,
    list:[],
    scrollTop : 0,
    scrollHeight:0,
    bottom: false,
    bglxArray:[{bglx:null,name:"变更类型"},{bglx:0,name:"积分支出"},{bglx:1,name:"积分收入"}],
    bglxIndex:0,
    bgqdArray:[{bglx:null,name:"变更渠道"},{bglx:0,name:"公益活动获取"},{bglx:1,name:"打卡活动获取"},{bglx:1,name:"兑换商品"},{bglx:1,name:"订单退单"},{bglx:1,name:"积分过期"}],
    bgqdIndex:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 身份
    var type = wx.getStorageSync('type');
    console.log('身份---'+type)
    if(0 == type){
      userId = app.globalData.userInfo.userId;
    }else{
      wx.switchTab({
        url: '/pages/person/person',
      })
    }
    // 个人积分
    userId = app.globalData.userInfo.userId;
    // wx.request({
    //   url: app.globalData.baseUrl + '/wechat/individual points?userId='+userId,
    //   success: res => {
    //     if(200 == res.code){
    //       this.setData({
    //         score:res.data
    //       })
    //     }else{
    //       console.log(res)
    //     }
    //   },
    //   fail:res=>{
    //     console.log(res);
    //   }
    // })
    
    // test
    this.setData({
      score:{
        pointLj:"0",
        pointKy: "0",
        pointYy: "0",
        pointGq: "0",
      }
    })
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
  bglxPickerChange: function(e) {
    var bglxIndex = e.detail.value;
    console.log('变更类型选择改变，携带值为', bglxIndex)
    this.setData({
      bglxIndex: bglxIndex
    })
    bglx = this.data.bglxArray[bglxIndex].bglx;
    console.log('bglx----', bglx)
    pageNum = 1;
    this.setData({
        list : [],
        scrollTop : 0,
        bottom:false
    });
    var that = this;
    loadMore(that);
  },
  bgqdPickerChange: function(e) {
    var bgqdIndex = e.detail.value;
    console.log('变更类型选择改变，携带值为', bgqdIndex)
    this.setData({
      bgqdIndex: bgqdIndex
    })
    bgqd = this.data.bgqdArray[bgqdIndex].bgqd;
    console.log('bgqd----', bgqd)
    pageNum = 1;
    this.setData({
        list : [],
        scrollTop : 0,
        bottom:false
    });
    var that = this;
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.hideHomeButton();
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