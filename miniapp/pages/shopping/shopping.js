
Page({
 
  data: {
    isSign:wx.getStorageSync('isSign')
   
  },
  
  onLoad:function(options){
    var isSign=wx.getStorageSync('isSign');
    console.log(isSign);
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
     var isSign=wx.getStorageSync('isSign');
     console.log(isSign);
      if(isSign=='1'){
        this.setData({  
            sign:true
           
       })
      }else  if(isSign=='0'){
        
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