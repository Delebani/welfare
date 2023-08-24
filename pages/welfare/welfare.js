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
}

Page({
  data: {
    searchValue: '',
    list:[],
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
    var that = this;
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
    pageNum = 1;
    this.setData({
        list : [],
        scrollTop : 0,
        bottom:false
    });
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
    pageNum = 1;
    this.setData({
        list : [],
        bottom:false
    });
    var that = this;
    loadMore(that);
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
    pageNum = 1;
    this.setData({
        list : [],
        bottom:false
    });
    var that = this;
    loadMore(that);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})