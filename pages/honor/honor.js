// pages/honor/honor.js
const app = getApp()
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
  //   url: app.globalData.baseUrl + '/wechat/standings?pageNum=1&pageSize=10',
  //   success: (res)  =>{
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
            
    //         
    //       if(total > pageSize * pageNum){
    //         pageNum ++;
    //       }else{
    //         that.setData({
    //           bottom: true
    //         })
    //       }
  //       })
  //     }
  //   },
  //   fail: function (err) {
  //     console.log("获取积分榜失败" + err)
  //   }
  // })
  var list = that.data.list;
  var testlist = [{
    "userId":"123141512",
    "openId":"SASIDJASKJHFAFBNALF",
    "nickName":"测试",
    "avatar":"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F12f18496-3075-4367-b599-ae390f0e0b37%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694328245&t=6f0b92ce966e0e4beba8d29c50d29c7d",
    "yhjfLj":"14",
    "order":"1"
   },
   {
    "userId":"123141512",
    "openId":"SASIDJASKJHFAFBNALF",
    "nickName":"测试",
    "avatar":"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F12f18496-3075-4367-b599-ae390f0e0b37%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694328245&t=6f0b92ce966e0e4beba8d29c50d29c7d",
    "yhjfLj":"14",
    "order":"1"
   },
   {
    "userId":"123141512",
    "openId":"SASIDJASKJHFAFBNALF",
    "nickName":"测试",
    "avatar":"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F12f18496-3075-4367-b599-ae390f0e0b37%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694328245&t=6f0b92ce966e0e4beba8d29c50d29c7d",
    "yhjfLj":"14",
    "order":"1"
   },
   {
    "userId":"123141512",
    "openId":"SASIDJASKJHFAFBNALF",
    "nickName":"测试",
    "avatar":"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F12f18496-3075-4367-b599-ae390f0e0b37%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694328245&t=6f0b92ce966e0e4beba8d29c50d29c7d",
    "yhjfLj":"14",
    "order":"1"
   },
   {
    "userId":"123141512",
    "openId":"SASIDJASKJHFAFBNALF",
    "nickName":"测试",
    "avatar":"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F12f18496-3075-4367-b599-ae390f0e0b37%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694328245&t=6f0b92ce966e0e4beba8d29c50d29c7d",
    "yhjfLj":"9",
    "order":"5"
   },
   {
    "userId":"123141512",
    "openId":"SASIDJASKJHFAFBNALF",
    "nickName":"测试",
    "avatar":"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F12f18496-3075-4367-b599-ae390f0e0b37%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694328245&t=6f0b92ce966e0e4beba8d29c50d29c7d",
    "yhjfLj":"8",
    "order":"6"
   },
   {
    "userId":"123141512",
    "openId":"SASIDJASKJHFAFBNALF",
    "nickName":"测试",
    "avatar":"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F12f18496-3075-4367-b599-ae390f0e0b37%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694328245&t=6f0b92ce966e0e4beba8d29c50d29c7d",
    "yhjfLj":"7",
    "order":"7"
   }]
          for(var i = 0; i < testlist.length; i++){
            list.push(testlist[i]);
          }
          console.log(testlist)
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
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    scrollTop : 0,
    scrollHeight:0,
    bottom: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   //   这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
   var that = this;
   wx.getSystemInfo({
       success:function(res){
           that.setData({
               scrollHeight:res.windowHeight-280
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
    this.onLoad();
    wx.stopPullDownRefresh();
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