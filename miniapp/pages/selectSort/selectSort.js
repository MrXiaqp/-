Page({
 data:{
  // array: ['手机','数码','图书','代步','办公','票务','配饰','电脑'],
  
  // index :0,

 },
 onLoad:function(){
   this.setData({
    //array:['手机','数码','图书','代步','办公','票务','配饰','电脑'],
   array: ['手机','数码','图书','代步','办公','票务','配饰','电脑'],
   index :0
   })

 },
 bindPickerChange:function(e){
      this.setData({
          index:e.detail.value
     
        
      })   
   wx.setStorageSync('sort', this.data.array[this.data.index]);
 }




})