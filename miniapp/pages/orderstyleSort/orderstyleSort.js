
var ip = wx.getStorageSync('ip');
Page({
    onLoad:function(event){
       this.getOrderStyle();
    },
    getOrderStyle:function(){
       var that = this;
          var url = ip + '/biyedesign/public/index.php/miniAPI/v1.getorderstyle/getorderstyle';
       wx.request({
         url: url,
         data: {

         },
         method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
             "Content-Type": "application/x-www-form-urlencoded"
          }, // 设置请求的 header
         success: function(res){
           // success
           that.setData({
               array: res.data,
               index :0

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
    bindPickerChange:function(e){
        this.setData({
          index:e.detail.value
     
        
      })   
     wx.setStorageSync('Ordersort', this.data.array[this.data.index]);
    }


})