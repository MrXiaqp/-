var homePageList = [];

Page({
  data:{

    src1: 'http://img0.ph.126.net/C7e9jf-lFHJ_eLSbzfDW4g==/6632428961094691719.png'

  },
  onLoad: function (options) {

    this.getbuyList(wx.getStorageSync('userid'));



  },
  onShow: function () {
    this.getbuyList(wx.getStorageSync('userid'));

  },
  getbuyList:function(uid){
    var that = this;
    var ip = wx.getStorageSync('ip')
    var url = ip + '/biyedesign/public/index.php/miniAPI/v1.getbuy/getbuy';
    wx.request({
      url: url,
      data: {
        uid: uid,


      },
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // success
        //外层循环，遍历title
        var count;
        //内存循环，从当前的count开始，因为之前的已经循环
        var count1;
        //记录重复的图片个数
        var imgcount = 0;
        //先保留下当前的imgcount值，记录了重复的个数以后，从重复的数字后面开始查找
        var imgcount1 = 0;
        //保存当前的图片img
        var imgList = [];
        //定义一个页面对象
        var homePage;

        //保存显示的页面的count
        var homePageCount = 0;
        //拿到所有的数据
        var viewList = res.data;

        var i;
        console.log(viewList);
        console.log(viewList.length);
        for (count = 0; count < viewList.length; count += imgcount) {

          imgcount = 0;
          var pid = viewList[count]['pid']
          console.log(pid);
          //计算中间的count
          var count2 = 0
          //中间的viewList
          var viewList1 = [];
          for (count1 = count; count1 < viewList.length; count1++) {
            if (viewList[count1]['pid'] == pid) {
              viewList1 = viewList[count + count2];
              viewList[count + count2] = viewList[count1];
              viewList[count1] = viewList1;
              count2++;
            }


          }
          
          for (count1 = count; count1 < viewList.length; count1++) {
            if (viewList[count1]['pid'] == pid) {
              imgList[imgcount] = viewList[count1]['photoDetial'];
              imgcount++;

            }
          }


          //       // console.log(imgList);

          console.log(imgList);
          var productInfo = new Object();
          productInfo.userImage = viewList[count]['userImage'];
          productInfo.username = viewList[count]['username'];
          productInfo.productTitle = viewList[count]['productTitle'];
          productInfo.productDetail = viewList[count]['productDetail'];
          productInfo.price = viewList[count]['price'];
          productInfo.productPhone = viewList[count]['productPhone'];
          productInfo.productionId = viewList[count]['pid'];
          productInfo.userId = wx.getStorageSync('userid');
          if (viewList[count]['applystatic'] == 2) {

            productInfo.isrefuse = true;
            productInfo.applyTuihuo=false;
            that.setData({
              
              styl2:'margin-left: 100rpx;'


            }) 
            
          } else if (viewList[count]['applystatic'] == 0 || viewList[count]['applystatic'] == 1) {

            productInfo.isrefuse = false;
            productInfo.applyTuihuo = true;
            that.setData({
              
              styl2: 'margin-left: 10rpx;'

            }) 

          }
          productInfo.list = [];
          for (i = 0; i < imgList.length; i++) {
            productInfo.list[i] = imgList[i];

          }
          homePageList[homePageCount++] = productInfo;
          console.log(homePageList);
          imgList = [];
        }

        that.setData({
          buyList: homePageList


        })
        homePageList = [];
      }

    })




  },
  
  applyproduct:function(event){
    var postId = event.currentTarget.id;
    var that = this;
    var ip = wx.getStorageSync('ip');
    console.log(postId);
    var url = ip + '/biyedesign/public/index.php/miniAPI/v1.changeapply/changeapply';
    wx.request({
      url: url,
      data: {
        uid: wx.getStorageSync('userid'),
        pid: this.data.buyList[postId].productionId,
      },
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success:function(res){
         if(res.data==1){
           wx.showToast({
             title: '申请退货成功',
             duration: 2000

           })
           

         }else if(res.data==0){
           wx.showToast({
             title: '已经申请不需要重复申请',
             duration: 2000

           })


         }else if(res.data==2){
           wx.showToast({
             title: '卖家拒绝了你的申请',
             duration: 2000

           })
             


         }


      }
    })
 

  },
  applyTuihuo:function(event){

    var postId = event.currentTarget.id;
    var that = this;
    var ip = wx.getStorageSync('ip');
    console.log(postId);
    var url = ip + '/biyedesign/public/index.php/miniAPI/v1.changeapply/delapply';
    wx.request({
      url: url,
      data: {
        uid: wx.getStorageSync('userid'),
        pid: this.data.buyList[postId].productionId,
      },
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '取消退货成功',
            duration: 2000

          })
          that.onShow();

        }


      }
    })
  }


})