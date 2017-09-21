
var ip =wx.getStorageSync('ip');
var app = getApp();
 

Page({
   data:{

   src:'http://img0.ph.126.net/n_ErNCuku6AgIqKCHDlywQ==/6631858314561681033.jpg',

   },
   onLoad:function(){
      this.getIssueList(wx.getStorageSync('userid'));
       



   },
    getIssueList:function(uid){
          var that = this;
 
       var url =ip+'/biyedesign/public/index.php/miniAPI/v1.getIssue/getIssue';
        wx.request({
          
          url: url,
          data: {
            uid:uid,
           
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
                "Content-Type": "application/x-www-form-urlencoded"
          }, // 设置请求的 header
          success: function(res){
            // success
            //外层循环，遍历title
            var count;
            //内存循环，从当前的count开始，因为之前的已经循环
            var count1;
            //记录重复的图片个数
            var imgcount=0;
            //先保留下当前的imgcount值，记录了重复的个数以后，从重复的数字后面开始查找
            var imgcount1=0;
            //保存当前的图片img
            var  imgList=[];
            //定义一个页面对象
            var homePage;
            //保存显示的页面
            var homePageList = [];
            //保存显示的页面的count
            var homePageCount=0;
            //拿到所有的数据
            var viewList = res.data;

            var i;
            console.log(viewList);
            console.log(viewList.length);
            for(count=0;count< viewList.length;count+=imgcount){
                    
                    imgcount=0;
                    var pid =viewList[count]['pid'] 
                    console.log(pid);
                    //计算中间的count
                    var count2 = 0
                    //中间的viewList
                    var viewList1 = [];
                    for (count1 = count; count1 < viewList.length; count1++){
                         if (viewList[count1]['pid'] == pid){
                           viewList1 = viewList[count + count2];
                           viewList[count + count2]=viewList[count1];
                           viewList[count1]=viewList1;
                           count2++;
                      } 


                    }

                    for(count1=count;count1<viewList.length;count1++){
                          if(viewList[count1]['pid']==pid){
                               imgList[imgcount]=viewList[count1]['photoDetial'];
                               imgcount++;
                             
                          }
                     }
                  
                  
            //       // console.log(imgList);
                  
                       console.log(imgList);
                   var productInfo=new Object();
                      productInfo.userImage=viewList[count]['userImage'];
                       productInfo.username=viewList[count]['username'];
                       productInfo.productTitle=viewList[count]['productTitle'];
                       productInfo.productDetail=viewList[count]['productDetail'];
                       productInfo.price=viewList[count]['price'];
                       productInfo.productPhone=viewList[count]['productPhone'];
                       productInfo.productionId=viewList[count]['pid'];
                       productInfo.category = viewList[count]['category'];
                       productInfo.userId=wx.getStorageSync('userid');
                       productInfo.list=[];
                       for(i=0;i<imgList.length;i++){
                          productInfo.list[i] = imgList[i];
                       
                       }
                    homePageList[homePageCount++]= productInfo; 
                   console.log(homePageList);
                   imgList=[];
            }
            
            that.setData({
                issueList:homePageList
               

            })
           console.log(imgList);
           homePageList = [];
          
          },
          fail: function(res) {
            // fail
          },
          complete: function(res) {
            // complete
          }
        })



    },
    soldout:function(event){
        var postId=event.currentTarget.id;
        var that = this;
        var url =ip+'/biyedesign/public/index.php/miniAPI/v1.addsoldout/addsoldout';
        wx.request({
          url: url,
          data: {
            productionId: this.data.issueList[postId].productionId,
            userId: this.data.issueList[postId].userId
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          }, // 设置请求的 header
          success: function(res){
            // success
            if(res.data==1){
                wx.showToast({
                 title:'商品下架成功,编辑重新上架',
                  duration:2000

             })
            }else if(res.data==0){
              wx.showToast({
                 title:'商品已经下架啦，请编辑重新上架',
                  duration:2000

             })

            }
          },
        
        })
        console.log(postId);
    },
    editproduct:function(event){
       var postId=event.currentTarget.id;
       console.log(postId);
       var postId = event.currentTarget.id;
       
       app.globalData.middleProduct = this.data.issueList[postId]
       wx.switchTab({
         url: '../issue/issue',
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
})