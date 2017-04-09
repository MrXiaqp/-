var isSign = wx.getStorageSync('isSign');
Page({
  data: {
    
   
  },
  onLoad:function(options){
    if(isSign=='0'){
     wx.switchTab({
       url: '../my/my',
       success: function(res){
       
       },
       fail: function() {
   
       },
       complete: function() {
         // complete
       }
     })
     
    }
   },
   onShow:function(options){
      if(isSign=='1'){
        this.setData({  
            sign:true
           
       })
      }
       if(isSign=='0'){
     wx.switchTab({
       url: '../my/my',
       success: function(res){
       
       },
       fail: function() {
   
       },
       complete: function() {
         // complete
       }
     })
     
    }
   },
   onReady:function(options){
       
    
   },
   onHide:function(options){
      
   },
  onUnload:function(options){
    

  }

})