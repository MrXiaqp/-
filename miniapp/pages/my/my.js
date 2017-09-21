var ip =wx.getStorageSync('ip');
Page({
  data:{
    fabu:"/images/my-issue.png",
    sale:"http://img0.ph.126.net/jRbRQu6peDtaAEe80ehO-w==/6632007848143967649.png",
    sell:"http://img0.ph.126.net/jRbRQu6peDtaAEe80ehO-w==/6632007848143967649.png",
    collect:"http://img1.ph.126.net/ECljLRrYSq0JrRQHwNSm-A==/6632330005048240213.png"

  },
  onLoad:function(options){
     var isSign = wx.getStorageSync('isSign')
    //var username = wx.getStorageSync('username');
    //var password = wx.getStorageSync('password');
   
    if(isSign=='0'){
      this.setData({  
            sign:true,
            sign1:false
       })
           
      }else if(isSign=='1'){
          this.findCount(wx.getStorageSync('uid'));
         this.setData({  
            sign:false,
            sign1:true,
           userImg:wx.getStorageSync('userImg'),
            username:wx.getStorageSync('username')
     
           
         })
       
      }
      
    },
    onShow:function(options){
        var isSign = wx.getStorageSync('isSign')
    //var username = wx.getStorageSync('username');
    //var password = wx.getStorageSync('password');
   
    if(isSign=='0'){
      this.setData({  
            sign:true,
            sign1:false,
         
       })
           
      }else if(isSign=='1'){
          this.findCount(wx.getStorageSync('uid'));
         this.setData({  
            sign:false,
            sign1:true,
            userImg:wx.getStorageSync('userImg'),
            username:wx.getStorageSync('username')
     
           
         })
       
      }


    },
  issueCount:function(){
    wx.navigateTo({
        url: '../my-commit/my-commit',
      
      })
  },
  wantproduct:function(){
      wx.navigateTo({
        url: '../wantproduct/wantproduct',
      })  


  },
  buy:function(){
     wx.navigateTo({
        url: '../mysell/mysell'

     })
  },
  sale:function(){
    wx.navigateTo({
        url: '../mysale/mysale'
    })
  },
  findCount:function(uid){
    var that = this;
    var url = ip+'/biyedesign/public/index.php/miniAPI/v1.getcount/getcount'
      wx.request({
        url: url,
        data: {
          uid:wx.getStorageSync('userid')
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
           "Content-Type": "application/x-www-form-urlencoded"
  
        }, // 设置请求的 header
        success: function(res){
          // success
          console.log(res.data);
            that.setData({
                issueCount:res.data.issueCount,
                issueLikeCount:res.data.issueLikeCount,
                buyCount: res.data.buyCount,
                saleCount: res.data.saleCount
            })
        },
        fail: function(res) {
          // fail
        },
        complete: function(res) {
          // complete
        }
      })
 

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
  if(this.data.username.length == 0||this.data.password.length == 0){
      wx.showModal({
        title:'温馨提示',
        content:'用户名或者密码不能为空',
        showCancel:false,

      })
   
  }else {
     //console.log('1');
     var that = this;
   
     var url = ip+'/biyedesign/public/index.php/miniAPI/v1.getuser/getuser'
    // wx.setStorageSync('username', this.data.username)
     wx.request({
       url: url,
       data: {
          username:this.data.username,
          password:this.data.password

       },
       method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        }, // 设置请求的 header
       success: function(res){
         // success
         console.log(res.data);
        //  1
        if(res.data){
           wx.setStorageSync('isSign', '1');
           wx.setStorageSync('userid',res.data.id);
           wx.setStorageSync('userImg',res.data.photoImag)
           wx.setStorageSync('username',res.data.username)
           wx.setStorageSync('password', res.data.password)
           that.setData({
               userImg:res.data.photoImag,
               username:res.data.username

          });
           that.onLoad();
        }else{
           
        
        }
       },
       fail: function(res) {
         // fail
       },
       complete: function(res) {
         // complete
       }
     })
    //wx.setStorageSync('isSign',1);
    //console.log(wx.getStorageSync('isSign'));
 
  //  this.onLoad();
   
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
},
     tuichu:function(e){
       
        wx.setStorageSync('isSign', '0');
        this.onLoad();

     }

})