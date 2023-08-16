//登录页面login/index.js
const app=getApp()
let redirect = ''
Page({
  data: {
    viewShow: false
  },
  onLoad: function (option) {
    console.log(option);
    redirect = option.redirect;
    console.log(redirect);
    // 判定用户缓存存在
    var userInfo = wx.getStorageSync('userinfo');
    if(userInfo){
      console.log('用户缓存存在，跳转至----' + redirect)
      app.globalData.userInfo = userInfo;
      app.globalData.openid = 'ol9nc4nKxah4nK-tZpyAmh-FKYPo';
      app.globalData.mobile = '15712844510';
      app.globalData.userId = 1;
      wx.switchTab({
        //获取当前页面的路径，在未登陆的情况下通过地址参数传给登录页面
          url: redirect,
          success:function(e){
　　　　　　　　console.log(e)
　　　　　　  },
          fail:function(e){
　　　　　　　　console.log(e)
　　　　　　  }
        })
      return
    }else{
    // ====== 【获取Code】
      wx.login({
        success: (res) => {
          // console.log(res.code);
          // this.setData({
          //   wxCode: res.code,
          // })
          // //====== 【获取OpenId、sessionKey】 ol9nc4nKxah4nK-tZpyAmh-FKYPo
          // let m_code = this.data.wxCode; // 获取code
          // console.log("m_code:" + m_code);
          // let url =  app.globalData.baseUrl + '根据code获取openid';
          // console.log(url);
          // wx.request({
          //     url: url,
          //     success: (res) => {
          //         console.log("openID===" + res.data.openid);
          //         console.log("sessionKey===" + res.data.sessionKey);
          //         this.setData({
          //         wxOpenId: res.data.openid
          //         })
          //         app.globalData.openid = res.data.openid
          //     },
          //     fail: function (err) {
          //     console.log("获取openid失败" + err)
          //     }
          // })
          // // 请求用户信息
          // wx.request({
          //     url: app.globalData.baseUrl + '根据openid获取用户url',
          //     success: (res) => {
          //         console.log(res);
          //         // 用户不存在，需要登录授权
          //         if(null == res.data){
          //           this.setData({
          //             viewShow: true
          //           })
          //         }else{// 用户存在
          //           wx.setStorageSync('userinfo',  res.data),
          //           app.globalData.userInfo = res.data,
          //           app.globalData.mobile = res.data.mobile
          //           app.globalData.userId = res.data.userId
          //           wx.redirectTo({
                      //   url: '/pages/identity/identity?active=',
                      // })
          //         }
          //     },
          //     fail: function (err) {
          //       console.log("获取用户信息失败" + err)
          //     }
          //})
          // 假定获取了用户
          // userInfo = {'name':'张三','head':'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F12f18496-3075-4367-b599-ae390f0e0b37%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694328245&t=6f0b92ce966e0e4beba8d29c50d29c7d','openid':'ol9nc4nKxah4nK-tZpyAmh-FKYPo','mobile':'15712844510','type':'0','deptId':'1','userId':'1','jf':10},
          // app.globalData.userInfo = userInfo,
          // app.globalData.openid = 'ol9nc4nKxah4nK-tZpyAmh-FKYPo',
          // app.globalData.mobile = '15712844510',
          // app.globalData.userId = 1,
          // wx.setStorageSync('userinfo', userInfo)
          // wx.redirectTo({
          //   url: '/pages/identity/identity?active=',
          // })
          this.setData({
            viewShow: true
          })
        }
      })
    }
  },
  test(e){
    console.log("登录测试");
    // 判定用户缓存存在
    var userInfo = wx.getStorageSync('userinfo');
    if(userInfo){
      console.log('用户缓存存在，跳转至----' + redirect)
      wx.switchTab({
        //获取当前页面的路径，在未登陆的情况下通过地址参数传给登录页面
          url: redirect,
          success:function(e){
　　　　　　　　console.log(e)
　　　　　　  },
          fail:function(e){
　　　　　　　　console.log(e)
　　　　　　  }
        })
      return
    }else{
      userInfo = {'name':'张三','head':'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F12f18496-3075-4367-b599-ae390f0e0b37%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1694328245&t=6f0b92ce966e0e4beba8d29c50d29c7d','openid':'ol9nc4nKxah4nK-tZpyAmh-FKYPo','mobile':'15712844510','type':'0','deptId':'1','userId':'1','jf':10},
      
      wx.setStorageSync('userinfo', userInfo)
      wx.redirectTo({
        url: '/pages/identity/identity?active=',
      })
      app.globalData.userInfo = userInfo;
      app.globalData.openid = 'ol9nc4nKxah4nK-tZpyAmh-FKYPo';
      app.globalData.mobile = '15712844510';
      app.globalData.userId = 1;
    }
  },
  getPhoneNumber (e) {
    console.log(e.detail.code)  // 动态令牌
    console.log(e.detail.errMsg) // 回调信息（成功失败都会返回）
    console.log(e.detail.errno)  // 错误码（失败时返回）
    const code = e.detail.code;
    // 请求后端接口获取urll
    wx.getUserInfo({
      success: res => {
        console.log("==iv==" + res.iv)
        console.log("==encryptedData==" + res.encryptedData)
        const encryptedData = res.encryptedData
        const iv = res.iv
        wx.request({
          url: app.globalData.baseUrl + '获取用户手机号url'+ code + encryptedData + iv,
          success: res => {
            console.log(res);
            // 获取到用户信息
            app.globalData.userInfo = res.data,
            app.globalData.openid = res.data.openid,
            app.globalData.mobile = res.data.mobile,
            app.globalData.userId = res.data.userId,
            wx.setStorageSync('userinfo', res.data),
            wx.redirectTo({
              url: '/pages/identity/identity?active=',
            })
          }
        })
      }
    })
  }
})