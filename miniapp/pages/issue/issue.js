

var productDetail={};
var app = getApp();
var AllImg=[]; 
var count=0;
var ip = wx.getStorageSync('ip');
Page({
  data: {
     delete:"http://img2.ph.126.net/Ur55Yh7zwURugbL0TIqx1Q==/6632173874399422382.png",
     addPhotot:"/images/issue.png",
     lightImageUrl:"http://img1.ph.126.net/8AsZ90TPnd3rzNWk5wUa_w==/6632543310303115360.jpg",
     xieImageUrl:"http://img0.ph.126.net/n_ErNCuku6AgIqKCHDlywQ==/6631858314561681033.jpg",
     phoneImageUrl:"http://img2.ph.126.net/orGpr640GnoUCY8LIiieDQ==/6631878105770979815.png",
      
  },
  onLoad:function(options){
   // wx.setStorageSync('sort', ' ');
    productDetail = app.globalData.middleProduct;
    //console.log(productDetail);
    var isSign = wx.getStorageSync('isSign');
    var schools = wx.getStorageSync('school');
   // console.log(schools);
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
      // if (productDetail==undefined){
      //  AllImg = productDetail.list;
      //   count = productDetail.list.length;
      //   console.log(count);
      //   console.log(AllImg);
      //   this.setData({
      //     sign: true,
      //     imageList: productDetail.list,
      //     productTitle: productDetail.productTitle,
      //     productDetail: productDetail.productDetail,
      //     productPhone: productDetail.productPhone,
      //     school: schools,
      //     productPrice: productDetail.price,
      //     sort: productDetail.category

      //   })


      // }else{
       // AllImg=[];
      //  count=0;
      // if (productDetail.list != null) {
      //   // wx.setStorageSync('sort',' ');
      //   console.log('老啊')
      //   console.log(wx.getStorageSync('sort'))
      //   AllImg = productDetail.list;
      //   // if (AllImg!=null){
      //   count = productDetail.list.length;
      //   // }else{
      //   // count=0;
      //   //AllImg=[];
      //   // }
      //   console.log(count);
      //   console.log(AllImg);
      //   this.setData({
      //     sign: true,
      //     imageList: productDetail.list,
      //     productTitle: productDetail.productTitle,
      //     productDetail: productDetail.productDetail,
      //     productPhone: productDetail.productPhone,
      //     school: schools,
      //     productPrice: productDetail.price,
      //     productionId: productDetail.productionId


      //   })
      //   if (wx.getStorageSync('sort') != ' ') {
      //     this.setData({

      //       sort: wx.getStorageSync('sort')

      //     })


      //   }
      //   else if (wx.getStorageSync('sort') == ' ') {
      //     console.log(productDetail.category)
      //     this.setData({

      //       sort: productDetail.category

      //     })


      //   }

      // } else if (productDetail.list == null) {
      //   console.log('1');
        //AllImg = [];
        //count = 0;
        //wx.setStorageSync('sort',' ');
        this.setData({
          sign: true,
          sort: wx.getStorageSync('sort'),
          school: schools,
        })
       //}
      //}

    }
   },
   onShow:function(options){
     //wx.setStorageSync('sort', ' ');
     productDetail = app.globalData.middleProduct;
     //AllImg = productDetail.list;
     console.log(productDetail);
     var isSign = wx.getStorageSync('isSign');
     var schools = wx.getStorageSync('school');
     console.log(productDetail.category)
      if(isSign=='1'){
        if (productDetail.list!=null){
       
         wx.setStorageSync('sort',' ');
        
          console.log(wx.getStorageSync('sort'))
          if (AllImg.length== 0){
          AllImg = productDetail.list;
          count = productDetail.list.length;
          }
           console.log(count);
           console.log(AllImg);
           this.setData({
             sign: true,
             imageList: AllImg,
             productTitle: productDetail.productTitle,
             productDetail: productDetail.productDetail,
             productPhone: productDetail.productPhone,
             school: schools,
             productPrice: productDetail.price,
             productionId: productDetail.productionId
           

           })
         if(wx.getStorageSync('sort')!=' '){
           this.setData({

             sort: wx.getStorageSync('sort')

           })

          
         }
         else if(wx.getStorageSync('sort')==' '){
           console.log(productDetail.category)
           this.setData({
             school: schools,
             sort: productDetail.category,
            
           })
         
         
         }

        } else if (productDetail.list==null){
          // console.log('1');
          // AllImg = [];
          // count = 0;
          //wx.setStorageSync('sort',' ');
         this.setData({  
           sign:true,
           sort:wx.getStorageSync('sort'),
         })
        }
      }else if(isSign=='0'){
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

     //productDetail={};
      //AllImg =[];
     //this.onLoad();
   
   },
  onUnload:function(options){
    wx.removeStorageSync('school');

  },
  //增加一组照片
 addPhoto:function(event){
 
    var that = this;
    
      if(count==0){
        wx.chooseImage({
          count: 9, 
          sizeType: ['original', 'compressed'], 
          sourceType: ['album', 'camera'], 
          success: function(res){
            // success
             console.log("1");
         that.setData({
             imageList:res.tempFilePaths

         })
          count = res.tempFilePaths.length;

          //AllImg.length = 0;
          for (var i = 0; i < res.tempFilePaths.lengh;i++){

            AllImg.push(res.tempFilePaths[i]);


          }
          
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

               console.log(AllImg);
               
             },
             fail: function(res) {
              
             },
             complete: function(res) {
               
             }
           })
   

         }
       
     

  },
  //删除一个照片所进行的操作
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
    },
    //跳转选择分类
   select:function(event){
      wx.navigateTo({
        url: '../selectSort/selectSort',
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

   
   },
  //获取宝贝的信息
  productTitle:function(e){
    this.setData({
       productTitle:e.detail.value
    })
  },
   //获取宝贝的详细描述
  productDetail:function(e){
    this.setData({
      productDetail:e.detail.value
    })
  },
 //获取电话
  productPhone:function(e){
     this.setData({
      productPhone:e.detail.value
    })
  },
 //获取价格的输入
  productPrice:function(e){
    this.setData({
      productPrice:e.detail.value 
    })
  },

 //按提交按钮以后所进行的操作，先进行宝贝的详情的一些提交
   submit:function(event){
     console.log(this.data.imageList.length);

     if (this.data.imageList==undefined && this.data.imageList.length == 0&&this.data.productTitle.length == 0&&this.data.productDetail.length == 0&&this.data.productPhone.length == 0){
     wx.showModal({
         title:'温馨提示',
         content:'有一项不能为空',
         showCancel:false,
        
      })
      return false;
      }else{
        wx.showLoading({
            title:'正在发布，请稍等'

        })
       var that =this;
       if (productDetail.list==null){
       var url = ip +'/biyedesign/public/index.php/miniAPI/v1.addproduct/addproduct';
      wx.request({
        url: url,
        data: {
          productTitle:this.data.productTitle,
          productDetail:this.data.productDetail,
          productPhone:this.data.productPhone,
          productPrice:this.data.productPrice,
          school:wx.getStorageSync('school'),
          sort:wx.getStorageSync('sort'),
          uid:wx.getStorageSync('userid')
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        }, // 设置请求的 header
        success: function(res){
        
          if(res.data){
            console.log(that.data.imageList);
            console.log(that.data.productTitle);
            var imageLists = that.data.imageList;
            var title =that.data.productTitle;
            that.sendPhotos(imageLists,res.data);
          }
        },
        fail: function(res) {
          // fail
        },
        complete: function(res) {
          // complete
        }
       })
       
       } else if (productDetail.list!=null){
         console.log(this.data.imageList.length);
         console.log(this.data.productTitle);
         console.log(this.data.productDetail);
         console.log(this.data.productPhone);
         console.log(this.data.productPrice);
         console.log(this.data.imageList)
         console.log(wx.getStorageSync('school'));
         console.log(this.data.sort);
         console.log(wx.getStorageSync('userid'));
         console.log(this.data.productionId);
        var img=[];
        var url = ip +    '/biyedesign/public/index.php/miniAPI/v1.editproduct/editproduct';
        // var arr = JSON.stringify(this.data.imageList);
         //console.log(arr);
         wx.request({
           url: url,
           data: {
             //img: JSON.stringify(this.data.imageList)
             //img:this.data.imageList
              productTitle: this.data.productTitle,
              productDetail: this.data.productDetail,
              productPhone: this.data.productPhone,
              productPrice: this.data.productPrice,
              school: wx.getStorageSync('school'),
              category: this.data.sort,
              uid: wx.getStorageSync('userid'),
              pid: productDetail.productionId
           },
           method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
           header: {
             "Content-Type": "application/x-www-form-urlencoded"
           }, // 设置请求的 header
           success: function (res) {
              //console.log(res.data);
             var imageLists = that.data.imageList;
               if(res.data==1){
                 console.log(res.data);
                 that.Editproductphoto(imageLists);
                 

               }else{
                 that.Editproductphoto(imageLists);



               }
            //  if (res.data) {
            //    console.log(that.data.imageList);
            //    console.log(that.data.productTitle);
            //    var imageLists = that.data.imageList;
            //    var title = that.data.productTitle;
            //    that.sendPhotos(imageLists, res.data);
            //  }
           },
           fail: function (res) {
             // fail
           },
           complete: function (res) {
             // complete
           }
         })



      }
      }
 
   },
   sendPhotos:function(arr,productId){
     var that = this;
     console.log(arr);
     console.log(productId);
     var url = ip + '/biyedesign/public/index.php/miniAPI/v1.addphoto/addphoto';
      if(arr.length!=0){
      wx.uploadFile({
        url: url,
        filePath:arr[0],
        name:'productImg',
         header: {
           "Content-Type": "multipart/form-data"
        }, // 设置请求的 header
        formData: {
            productId:productId
        }, // HTTP 请求中其他额外的 form data
        success: function(res){
          // success
          if(res.data==1){
             var data = res.data;
             arr.splice(0,1)
             that.sendPhotos(arr,productId)
          }
        },
        fail: function(res) {
          // fail
        },
        complete: function(res) {
          // complete
        }
      })

      }else{
         wx.hideLoading();
         wx.showToast({
            title:'发布成功',
            duration:2000

         })
         AllImg=[];
         count=0;
         that.setData({
           productTitle:'',
           productDetail:'',
           productPhone:'',
           productPrice:'',
           imageList: AllImg
         })
         app.globalData.middleProduct={};
      }
   },
   Editproductphoto:function(arr){
     //console.log(arr);
      var that =this;

      var url1 = ip + '/biyedesign/public/index.php/miniAPI/v1.upanddown/upanddown';
      wx.request({
        url: url1,
        data: {
          pid: productDetail.productionId
        },
        method: 'POST', 
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        }, // 设置请求的 header
        success: function (res) {
          //console.log(res.data);
          var imageLists = that.data.imageList;
          console.log(res.data)

        }

      })
      
      
      var httpList=[];
      var phone=[];
     // var img = [];
      var httpListCount = 0;
      var phoneCount = 0;
      var url = ip + '/biyedesign/public/index.php/miniAPI/v1.editproductphoto/editproductphoto';
      for(var i=0;i<arr.length;i++){
       
        if(arr[i].substring(0,4)=='http'){
          httpList[httpListCount++] = arr[i];
          //httpListString = httpListStrin + '\'' + arr[i] + '\''+',';
        }else{
          phone[phoneCount++] = arr[i];
        }

      }
     // httpListString = httpListString.replace()
      console.log(phone);
      if (httpList.length!=0){
        console.log('111');
        console.log(httpList)
      wx.request({
        url: url,
        data: {
          img: JSON.stringify(httpList),
          //img:this.data.imageList,
          pid: productDetail.productionId
        },
        
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          //"Content-Type": "application/json"
          "Content-Type": "application/x-www-form-urlencoded"
        }, // 设置请求的 header
        success: function (res) {
          //console.log(res.data);
          var imageLists = that.data.imageList;
          console.log(res.data)
          if (res.data==1||res.data==2){
            console.log('我要插入数据库');
            //that.Editproductphoto(imageLists);
            if (phone.length!=0){
              console.log("我要插入数据库");
             console.log(res.data)
             that.sendPhotos(phone, productDetail.productionId)
           }else{

              wx.hideLoading();
              wx.showToast({
                title: '发布成功',
                duration: 2000

              })
              AllImg = [];
              count = 0;
              that.setData({
                productTitle: '',
                productDetail: '',
                productPhone: '',
                productPrice: '',
                imageList: AllImg
              })
              app.globalData.middleProduct = {};

           }

          }else{
          // console.log(res.data)
            //that.Editproductphoto(imageLists);
         }
     
        }
     
      })
      }else{

       // that.sendPhotos(phone, productDetail.productionId)
        console.log('121');
        console.log(phone)


      }
      
   },
   isShangjia:function(){
     var that = this;

     var url1 = ip + '/biyedesign/public/index.php/miniAPI/v1.upanddown/upanddown';
     wx.request({
       url: url1,
       data: {
         pid: productDetail.productionId
       },
       method: 'POST',
       header: {
         "Content-Type": "application/x-www-form-urlencoded"
       }, // 设置请求的 header
       success: function (res) {
         //console.log(res.data);
         var imageLists = that.data.imageList;
         console.log(res.data)

       }

     })


   }
})