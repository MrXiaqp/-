Page({
  data:{
     

  },
  onLoad:function(options){
    console.log('1');
    this.getAddress();

  
  },
  onShow: function (options){
     this.getAddress();
     



  },
  getAddress:function(){

    var that = this;
    var ip = wx.getStorageSync('ip');
    var url = ip + '/biyedesign/public/index.php/miniAPI/v1.GetAddress/GetAddress'
    wx.request({
      url: url,
      data: {
        uid: wx.getStorageSync('userid'),

      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"


      }, // 设置请求的 header
      success: function (res) {
        console.log(res.data);
        console.log(res.data[0].receptName);
        if (res.data == 0) {
          that.setData({
            addressname: '',
            addressphone: '',
            addresshouse: ''

          })
        } else {
          that.setData({
            addressname: res.data[0].receptName,
            addressphone: res.data[0].receptPhone,
            addresshouse: res.data[0].receptAddress
          })
        }

      },

    })



  },

  receptName:function(e){
    this.setData({
        addressname:e.detail.value

    })
  },
  receptPhone:function(e){
     this.setData({
        addressphone:e.detail.value

    })
  },
  receptAddress:function(e){
    this.setData({
       addresshouse:e.detail.value

    })
  },
  save:function(event){
    //ifthis.data.addressname
    if(this.data.addressname.length == 0&&this.data.addressphone.length == 0&&this.data.addresshouse.length == 0){
     wx.showModal({
        title:'温馨提示',
        content:'不能为空',
        showCancel:false,

      })

    }else{
       wx.showLoading({
           title:'正在保存，请稍等'

       })
       var that = this;
       var ip = wx.getStorageSync('ip');
       var url = ip+'/biyedesign/public/index.php/miniAPI/v1.adaptAddress/adaptAddress'

       wx.request({
         url: url,
         data: {
            uid:wx.getStorageSync('userid'), 
            addressname:this.data.addressname,
            addressphone:this.data.addressphone,
            addresshouse:this.data.addresshouse
         },
         method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         header: {
            "Content-Type": "application/x-www-form-urlencoded"

          }, // 设置请求的 header
         success: function(res){
           // success
           console.log(res.data)
           wx.hideLoading();
           wx.showToast({
             title:'保存成功',
             duration:2000

           })
           that.setData({
              addressname:res.data[0].receptname,
              addressphone:res.data[0].receptPhone,
              addresshouse:res.data[0].receptAddress
           })
           that.onLoad();
         },
         fail: function(res) {
           // fail
         },
         complete: function(res) {
           // complete
         }
       })
    }
  
  }
    
})