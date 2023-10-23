// app.js
App({
  globalData: {
    baseUrl:'https://xynj.vip.cpolar.cn/prod-api',
    userInfo: {},
    openId: '',
    userId: '',
  },
  onLaunch: function(options) {
    //获取自定义导航栏高度-用于信息页面--tcy
    this.getNavigationBarHeight();
  },
  
  getNavigationBarHeight(){
    const { statusBarHeight, platform } = wx.getSystemInfoSync()
    const { top, height } = wx.getMenuButtonBoundingClientRect()
    // 状态栏高度
    wx.setStorageSync('statusBarHeight', statusBarHeight)
    // 胶囊按钮高度 一般是32 如果获取不到就使用32
    wx.setStorageSync('menuButtonHeight', height ? height : 32)
    // 判断胶囊按钮信息是否成功获取
    if (top && top !== 0 && height && height !== 0) {const navigationBarHeight = (top - statusBarHeight) * 2 + height
      // 导航栏高度
      wx.setStorageSync('navigationBarHeight', navigationBarHeight)
    } else {
      wx.setStorageSync('navigationBarHeight',platform === 'android' ? 48 : 40)
    }
  },
})