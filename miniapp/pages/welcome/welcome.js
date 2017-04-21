Page({

    data:{
    text: "This is page data",
    city:['甘肃省','广东省','陕西省'],
    school:[["西北师范大学","兰州大学"],["仲恺农业工程学院","中山大学"],["西北工业大学","西安交通大学"]],
    },
  bindchange:function(e){
    const val = e.detail.value;
      this.setData({
         value:val[0],
         value1:val[1]
       
      })
     wx.setStorageSync('school', this.data.school[this.data.value][this.data.value1]);

     console.log(wx.getStorageSync('school'));
  },
  start:function(event){
   wx.switchTab({
     url: '../homePage/homePage',
     success: function(res){
       // success
     },
     fail: function(res) {
       // fail
     },
     complete: function(res) {
       // complete
     }
   })

   }
})