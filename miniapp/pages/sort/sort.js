var isSign = wx.getStorageSync('isSign');
Page({
  data: {
    bangongSrc:"http://img2.ph.126.net/vtSVTIqEj37XovI4cXrl4Q==/6632228849978152196.png",
    kajuanSrc:"http://img0.ph.126.net/wG61iqxNy5ghNzfn1gnVsQ==/6632248641187070964.png",
    peishiSrc:"http://img2.ph.126.net/l5dH185_BM9l1fbQpRHpVg==/6632165078306411879.png",
    peijianSrc:"http://img0.ph.126.net/zqqGdT9TathDXt8NizJDJA==/6632059525190146323.png",
    zixingSrc:"http://img0.ph.126.net/z2IQdVXhszYN4mrrAiKvHQ==/6632436657675800829.png",
    basketballSrc:"http://img2.ph.126.net/BUYDe-_aX5P2MkAFclT17w==/6632334403094419508.png",
    tushuSrc:"http://img0.ph.126.net/KZv_ootOB65g5RANAuLiRQ==/6632200262678502048.png",
    meiRongSrc:"http://img2.ph.126.net/rtio-a5DvHWS_d7fGa8EEA==/6632563101512995853.png"
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