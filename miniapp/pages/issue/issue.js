var isSign = wx.getStorageSync('isSign');


var AllImg; 
var count=0;
Page({
  data: {
     delete:"http://img2.ph.126.net/Ur55Yh7zwURugbL0TIqx1Q==/6632173874399422382.png",
     addPhotot:"http://img0.ph.126.net/Xdx-5C4kKcMOvtFmhdy6ZQ==/6632547708350196861.png",
     lightImageUrl:"http://img1.ph.126.net/8AsZ90TPnd3rzNWk5wUa_w==/6632543310303115360.jpg",
     xieImageUrl:"http://img0.ph.126.net/n_ErNCuku6AgIqKCHDlywQ==/6631858314561681033.jpg",
     phoneImageUrl:"http://img2.ph.126.net/orGpr640GnoUCY8LIiieDQ==/6631878105770979815.png",
      
  },
  onLoad:function(options){
    var schools = wx.getStorageSync('school');
    console.log(schools);
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
     
    }else if(isSign=='1'){
      this.setData({
        school:schools
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
    wx.removeStorageSync('school');

  },
 addPhoto:function(event){
 
    var that = this;
    
      if(count==0){
        wx.chooseImage({
          count: 9, // 最多可以选择的图片张数，默认9
          sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
          sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
          success: function(res){
            // success
             console.log("1");
         that.setData({
             imageList:res.tempFilePaths

         })
          count = res.tempFilePaths.length;
          AllImg = res.tempFilePaths;
          console.log(AllImg);
          },
          fail: function(res) {
            // fail
          },
          complete: function(res) {
            // complete
          }
        })
       
         }else{
           var maxCount = 9-count;
           wx.chooseImage({
             count: maxCount, // 最多可以选择的图片张数，默认9
             sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
             sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
             success: function(res){
                  
                  for(var i=0;i<res.tempFilePaths.length;i++){
                        AllImg = AllImg.concat(res.tempFilePaths[i]);

                  }
             that.setData({
               imageList:AllImg

              })
               count = count+res.tempFilePaths.length;
           
             },
             fail: function(res) {
              
             },
             complete: function(res) {
               
             }
           })
          //  var temp=count;
          //   count =count+res.tempFilePaths.length;
            
          //   for(var i=temp;i<count;i++){
          //      AllImg[i]

          //   }

         }
       
     

  },
  deleteImg:function(event){
      var ids=event.currentTarget.id;
      
      console.log(ids);
      for(var i=ids-1;i<count;){
         console.log(i);
       console.log(AllImg[i]);
       if(i+2<count){
         AllImg[i+1]=AllImg[i+2];
       }

       
        console.log(AllImg[i]);
         i++;
      }
      AllImg.pop();
      console.log(AllImg);
      AllImg.length=--count;
     this.setData({
            imageList:AllImg

     })

  },
   fouc:function(event){
       this.setData({
            fouce:true

     })

   }
})