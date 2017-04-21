
Page({
  onLoad:function(options){
    var isSign = wx.getStorageSync('isSign');
   
    if(isSign=='0'){
      this.setData({  
            sign:true,
            sign1:false
       })
           
      }else if(isSign=='1'){
         this.setData({  
            sign:false,
            sign1:true
           
       })

      }
      
    },
    
   
 usernameInput:function(e){
      this.setData({
          username:e.detail.value
 
      })
 },
 passwordInput:function(e){
       this.setData({
          password:e.detail.value
 
      })
 },

//登录按钮事件，调用参数要用this.data参数，设置参数this.setData({})方法
loginBtnClick:function(e){
  if(this.data.username==null||this.data.password==null){
      wx.showModal({
        title:'温馨提示',
        content:'用户名或者密码不能为空',
        showCancel:false,

      })
   
  }else {
     
   wx.setStorageSync('isSign',1);
    console.log(wx.getStorageSync('isSign'));
 
    this.onLoad();
   
    //  wx.request({
    //    url: 'https://URL',
    //    data: {},
    //    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //    // header: {}, // 设置请求的 header
    //    success: function(res){
    //      // success
    //    },
    //    fail: function() {
    //      // fail
    //    },
    //    complete: function() {
    //      // complete
    //    }
    //  })

  }

}

})