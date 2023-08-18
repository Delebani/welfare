// pages/welfare/welfare.js
// 获取应用实例
const app = getApp()
var pageNum  = 1;
var pageSize = 10;
var type = 0;
var deptId = 0;
var userId = 0;
var flspMc = '';
var flspGroup = '';
var sort = 'fbTime';
var sortRuler = 'DESC';
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
    wx.request({
      url: app.globalData.baseUrl + '/wechat/xysq/flsp/list?pageNum='+pageNum+'&pageSize='+pageSize+'&type='+type+'&deptId='+deptId+'&userId='+userId+'&flspMc='+flspMc+'&flspGroup='+flspGroup+'&sort='+sort+'&sortRuler='+sortRuler,
      success: res => {
        var resp = res.data
        if(200 == resp.code){
          total = resp.total;
          //将搜索结果存储在searchResults中
          console.info(that.data.list);
            var list = that.data.list;
            for(var i = 0; i < resp.rows.length; i++){
              resp.rows[i].flspImg = app.globalData.baseUrl +  resp.rows[i].flspImg;
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
    
    that.setData({
      hidden:true
  });
}

Page({
  data: {
    searchValue: '',
    hidden:true,
    list:[],
    scrollTop : 0,
    scrollHeight:0,
    bottom: false,
    objectArray: [
      {
        flspGroup: '',
        name: '全部福利分组'
      },
      {
        flspGroup: 0,
        name: '餐饮美食'
      },
      {
        flspGroup: 1,
        name: '个人技能'
      },
      {
        flspGroup: 2,
        name: '美容美发'
      },
      {
        flspGroup: 3,
        name: '日用百货'
      },
      {
        flspGroup: 4,
        name: '生活服务'
      },
      {
        flspGroup: 5,
        name: '物品器械'
      },
      {
        flspGroup: 6,
        name: '场馆使用'
      },
      {
        flspGroup: 7,
        name: '公益商品'
      },
      {
        flspGroup: 8,
        name: '公益场地'
      },
      {
        flspGroup: 9,
        name: '教育培训'
      },
      {
        flspGroup: 10,
        name: '医疗保健'
      },
      {
        flspGroup: 11,
        name: '共享'
      }
    ],
    index: 0,
    sortArray:[
      {
        sort:'fbTime',
        sortRuler:'DESC',
        name:'最新发布'
      },
      {
        sort:'jf',
        sortRuler:'ASC',
        name:'积分升序'
      },
      {
        sort:'jf',
        sortRuler:'DESC',
        name:'积分降序'
      }
    ],
    sortIndex:0
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
    }else if(1 == type){
      deptId = app.globalData.userInfo.deptId;
      userId = '';
    }
    //   这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
      var that = this;
      wx.getSystemInfo({
          success:function(res){
              that.setData({
                  scrollHeight:res.windowHeight- 150
              });
          }
      });
      console.log('调用了');
      loadMore(that);
  },
  onShow:function(e){
    //this.onLoad();
  },
  onInput: function(event) {
    console.log(event.detail.value)
    flspMc = event.detail.value
  },
  onConfirm: function(event) {
    console.log(event.detail.value)
    flspMc = event.detail.value
  },
  onSearch: function(event) {
    console.log(flspMc)
    //进行搜索操作
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
    const flspId = event.currentTarget.dataset.flspid;
    console.log('--详情--'+ flspId)
    wx.navigateTo({
      url: '/pages/welfare/detail/detail?flspId='+flspId,
    })
  },
  bindPickerChange: function(e) {
    var index = e.detail.value;
    console.log('picker发送选择改变，携带值为', index)
    this.setData({
      index: index
    })
    flspGroup = this.data.objectArray[index].flspGroup;
    console.log('flspGroup----', flspGroup)
  },
  sortPickerChange: function(e) {
    var sortIndex = e.detail.value;
    console.log('picker发送选择改变，携带值为', sortIndex)
    this.setData({
      sortIndex: sortIndex
    })
    sort = this.data.sortArray[sortIndex].sort;
    sortRuler = this.data.sortArray[sortIndex].sortRuler;
    console.log('sort----'+sort + '---sortRuler--' +sortRuler)
  },

})