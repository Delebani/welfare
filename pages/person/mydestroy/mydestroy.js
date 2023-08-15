// pages/person/mydestroy/mydestroy.js
const app = getApp()
var pageNum = 0;
var pageSize = 10;
var deptId = null
var userId = null;
var spddStatus = null;
var total = 0;

var loadMore = function (that) {
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
    //   url: app.globalData.baseUrl + '/wechat/mywelfarelist',
    //   method: "POST",
    //   header: {  
    //     "Content-Type": "application/x-www-form-urlencoded"  
    //   },  
    //   data: {
    //     "pageNum": pageNum,
    //     "pageSize": pageSize,
    //     "userId": userId,
    //     "deptId": deptId,
    //     "spddStatus": spddStatus
    //   },  
    //   success: res => {
    //     if(200 == res.code){
    //       total = res.data.total
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

    var list = that.data.list;
    var testlist = [
      {
        "hxid":"1",
        "hxTime":"2020-02-02 02:02:02",
        "createBy":"张三",
        "orderId":"1",
        "orderBh":"订单编号",
        "orderBy":"下单人昵称",
        "flspMc":"商品名称",
        "flspId":"商品id",
        "spddStatus":0
     },{
      "hxid":"1",
        "hxTime":"2020-02-02 02:02:02",
        "createBy":"张三",
        "orderId":"1",
        "orderBh":"订单编号",
        "orderBy":"下单人昵称",
        "flspMc":"商品名称",
        "flspId":"商品id",
        "spddStatus":1
     },{
      "hxid":"1",
        "hxTime":"2020-02-02 02:02:02",
        "createBy":"张三",
        "orderId":"1",
        "orderBh":"订单编号",
        "orderBy":"下单人昵称",
        "flspMc":"商品名称",
        "flspId":"商品id",
        "spddStatus":2
     }]
            for(var i = 0; i < testlist.length; i++){
              if(testlist[i].spddStatus == '0'){
                testlist[i].spddStatustxt = '待核销'
              }else if(testlist[i].spddStatus == '1'){
                testlist[i].spddStatustxt = '已核销'
              }else if(testlist[i].spddStatus == '2'){
                testlist[i].spddStatustxt = '已退单'
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
    list:[],
    hidden:true,
    list:[],
    scrollTop : 0,
    scrollHeight:0,
    bottom: false,
    allcolor: '#000',
    allbackcolor:'#fff',
    hxcolor:'#000',
    hxbackcolor:'#fff',
    randomcode:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 身份
    var type = wx.getStorageSync('type');
    console.log('身份---'+type)
    if(1 == type){
      deptId = app.globalData.userInfo.deptId;
    }else{
      wx.switchTab({
        url: '/pages/person/person',
      })
    }
    spddStatus = 0;
    this.setData({
      hxcolor:'#fff',
      hxbackcolor:'#ff5256'
    })
    var that = this;
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
  choose: function (event) {
    console.log(event.currentTarget.dataset);
    spddStatus = event.currentTarget.dataset.spddstatus;
    if(0 == spddStatus){
      this.setData({
        allcolor:'#000',
        allbackcolor:'#fff',
        hxcolor:'#fff',
        hxbackcolor:'#ff5256'
      })
    }else{
      this.setData({
        allcolor:'#fff',
        allbackcolor:'#ff5256',
        hxcolor:'#000',
        hxbackcolor:'#fff'
      })
    }
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