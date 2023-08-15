// groupIndex.js
// 获取应用实例
const app = getApp()
var pageNum  = 1;
var pageSize = 10;
var type = 0;
var deptId = 0;
var userId = 0;
var gyhdMc = '';
var gyhdStatus = null;
var gyhdGroup = null;
var sort = 'fbTime';
var sortRuler = 'ASC';
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
    //   url: app.globalData.baseUrl + '/wechat/activitieslist',
    //   method: "POST",
    //   header: {  
    //     "Content-Type": "application/x-www-form-urlencoded"  
    //   },  
    //   data: {
    //     "pageNum": pageNum,
    //     "pageSize": pageSize,
    //     "type": type,
    //     "deptId": deptId,
    //     "userId": userId,
    //     "gyhdMc": gyhdMc,
    //     "gyhdStatus": gyhdStatus,
    //     "gyhdGroup": gyhdGroup,
    //     "sort": sort,
    //     "sortRuler": sortRuler
    //   },  
    //   success: res => {
    //     if(200 == res.code){
    //        total = res.data.total
    //       //将搜索结果存储在searchResults中
    //       console.info(that.data.list);
    //         var list = that.data.list;
    //         for(var i = 0; i < res.data.rows.length; i++){
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
      "gyhdMc":"活动名称",
      "gyhdStatus":"进行中",
      "gyhdHdsjKs":"2023-08-01",
      "gyhdImg":"https://img2.baidu.com/it/u=638285213,1746517464&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800"
     },{
      "gyhdId":2,
      "gyhdMc":"活动名称2",
      "gyhdStatus":"已结束",
      "gyhdHdsjKs":"2023-08-01",
      "gyhdImg":"https://img1.baidu.com/it/u=2812417321,4100104782&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750"
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
  
  data: {
    //获取各种高度信息---tcy
    // 状态栏高度
    statusBarHeight: wx.getStorageSync('statusBarHeight'),
    // 导航栏高度
    navigationBarHeight: wx.getStorageSync('navigationBarHeight'),
    // 胶囊按钮高度
    menuButtonHeight: wx.getStorageSync('menuButtonHeight'),
    // 导航栏和状态栏高度
    navigationBarAndStatusBarHeight:wx.getStorageSync('statusBarHeight') +wx.getStorageSync('navigationBarHeight'),
    searchValue: '',
    hidden:true,
    list:[],
    scrollTop : 0,
    scrollHeight:0,
    bottom: false,
    groupArray: [
      {
        gyhdGroup: null,
        name: '全部活动分组'
      },
      {
        gyhdGroup: 0,
        name: '巡防活动'
      },
      {
        gyhdGroup: 1,
        name: '常规志愿服务'
      },
      {
        gyhdGroup: 2,
        name: '重大特殊志愿服务'
      },
      {
        gyhdGroup: 3,
        name: '专业技能志愿服务'
      },
      {
        gyhdGroup: 4,
        name: '日常活动'
      }
    ],
    groupIndex: 0,
    statusArray: [
      {
        gyhdGroup: null,
        name: '全部活动状态'
      },
      {
        gyhdGroup: 0,
        name: '未开始'
      },
      {
        gyhdGroup: 1,
        name: '进行中'
      },
      {
        gyhdGroup: 2,
        name: '已结束'
      }
    ],
    statusIndex: 0,
    resident: false,
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad:function(){
    // 身份
    type = wx.getStorageSync('type');
    console.log('身份---'+type)
    if(null == type){
      type = 0;
    }
    if(0 == type){
      deptId = '';
      userId = app.globalData.userInfo.userId;
      this.setData({
        resident:true
      })
    }else if(1 == type){
      deptId = app.globalData.userInfo.deptId;
      userId = '';
      this.setData({
        resident:false
      })
    }
    
    gyhdMc = '';
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
  onInput: function(event) {
    console.log(event.detail.value)
    gyhdMc = event.detail.value
  },
  onConfirm: function(event) {
    console.log(event.detail.value)
    gyhdMc = event.detail.value
  },
  onSearch: function(event) {
    console.log(gyhdMc)
    //进行搜索操作
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
  detail: function (event) {
    console.log(event.currentTarget.dataset);
    const gyhdId = event.currentTarget.dataset.gyhdid;
    console.log('--详情--'+ gyhdId)
    wx.navigateTo({
      url: '/pages/activity/detail/detail?gyhdId='+gyhdId,
    })
  },
  groupPickerChange: function(e) {
    var groupIndex = e.detail.value;
    console.log('活动分组发送选择改变，携带值为', groupIndex)
    this.setData({
      groupIndex: groupIndex
    })
    gyhdGroup = this.data.groupArray[groupIndex].gyhdGroup;
    console.log('gyhdGroup----', gyhdGroup)
    pageNum = 1;
    this.setData({
        list : [],
        scrollTop : 0,
        bottom:false
    });
    var that = this;
    loadMore(that);
  },
  statusPickerChange: function(e) {
    var statusIndex = e.detail.value;
    console.log('活动状态发送选择改变，携带值为', statusIndex)
    this.setData({
      statusIndex: statusIndex
    })
    gyhdStatus = this.data.groupArray[statusIndex].gyhdGroup;
    console.log('gyhdStatus----', gyhdStatus)
    pageNum = 1;
    this.setData({
        list : [],
        scrollTop : 0,
        bottom:false
    });
    var that = this;
    loadMore(that);
  },
  myactivity: function (e) {
    console.log('我的活动')
    wx.navigateTo({
      url: '/pages/activity/myactivity/myactivity',
    })
  },
  //切换身份按钮实现
  identity: function () {
    console.log("切换身份")
    wx.navigateTo({
      url: '/pages/identity/identity?active=user',
    })
  },
  scan:function (event) {
    wx.navigateTo({
      url: '/pages/scan/scan?qrtype='+type,
    })
  }
})