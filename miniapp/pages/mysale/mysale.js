var homePageList = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getsaleproduct(wx.getStorageSync('userid'))
    
  },
  getsaleproduct:function(uid){
    var that = this;
    var ip = wx.getStorageSync('ip')
    var url = ip + '/biyedesign/public/index.php/miniAPI/v1.getsaleproduct/getsaleproduct';
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
          productInfo.getName = viewList[count]['receptName'];
          productInfo.getPhone = viewList[count]['receptPhone'];
          productInfo.getAddress = viewList[count]['receptAddress'];
          productInfo.productTitle = viewList[count]['productTitle'];
          productInfo.productDetail = viewList[count]['productDetail'];
          productInfo.price = viewList[count]['price'];
          productInfo.productPhone = viewList[count]['productPhone'];
          productInfo.productionId = viewList[count]['pid'];
          productInfo.userId = wx.getStorageSync('userid');
          if (viewList[count]['applystatic']==0){
                      
            productInfo.applystatic=false
          } else if (viewList[count]['applystatic'] == 1 || viewList[count]['applystatic'] == 2){

            productInfo.applystatic = true

          }
          //productInfo.applystatic = viewList[count]['applystatic'];
          productInfo.list = [];
          for (i = 0; i < imgList.length; i++) {
            productInfo.list[i] = imgList[i];

          }
          homePageList[homePageCount++] = productInfo;
          console.log(homePageList);
          imgList = [];
        }

        that.setData({
          saleList: homePageList


        })
        homePageList = [];
      }

    })


    


    
  },
  passTuihuo:function(event){
    var postId = event.currentTarget.id;
    var that = this;
    var ip = wx.getStorageSync('ip');
    console.log(postId);
    var url = ip + '/biyedesign/public/index.php/miniAPI/v1.Passandrefuse/passChange';
    wx.request({
      url: url,
      data: {
        uid: wx.getStorageSync('userid'),
        pid: this.data.saleList[postId].productionId,
      },
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '退货成功',
            duration: 1500

          })
          setTimeout(function(){

            that.onShow();


          },1500)
          
        } else if (res.data == 0) {
          wx.showToast({
            title: '退货失败，未知原因',
            duration: 2000

          })


        }
      }
    })

 

  },
  refuseTuihuo:function(event){
    var postId = event.currentTarget.id;
    var that = this;
    var ip = wx.getStorageSync('ip');
    var url = ip + '/biyedesign/public/index.php/miniAPI/v1.Passandrefuse/refuseChange';
    console.log(postId);
    wx.request({
      url: url,
      data: {
        uid: wx.getStorageSync('userid'),
        pid: this.data.saleList[postId].productionId,
      },
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '已拒绝',
            duration: 1500

          })
          setTimeout(function () {

            that.onShow();


          }, 1500)

        } else if (res.data == 0) {
          wx.showToast({
            title: '拒绝失败，未知原因',
            duration: 2000

          })


        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  }
})