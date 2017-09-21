
App({
 globalData :{
     middleProduct:{}


 },
 onLaunch:function (){
  // wx.setStorageSync('isSign', 0);
   var isSign=wx.getStorageSync('isSign')
   wx.setStorageSync('ip', 'http://127.0.0.1');
   //var ip ='192.168.155.1'
   if(isSign==null){
   wx.setStorageSync('isSign','0');
  
   }
   //var isSign=wx.getStorageSync('isSign')
   //if(isSign=='0'){
    //wx.setStorageSync('isSign','1');
   //wx.setStorageSync('username','');
 //  wx.setStorageSync('password', '');
   //console.log(wx.getStorageSync('username'))
    
 },
 onShow:function(){
     
 }

 })