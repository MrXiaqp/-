var ip = wx.getStorageSync('ip');
// 保存显示的页面
var homePageList = [];
Page({

  data: {
    isSign: wx.getStorageSync('isSign'),
    src: 'http://img0.ph.126.net/n_ErNCuku6AgIqKCHDlywQ==/6631858314561681033.jpg',

  },

  onLoad: function (options) {
    var isSign = wx.getStorageSync('isSign');
    console.log(isSign);
    if (isSign == '0') {
      wx.switchTab({
        url: '../my/my',
        success: function (res) {

        },
        fail: function () {

        },
        complete: function () {
          // complete
        }
      })

    } else if (isSign == '1') {
      this.getOrder(wx.getStorageSync('userid'));


    }
  },
  onShow: function (options) {
    var isSign = wx.getStorageSync('isSign');
    console.log(isSign);
    if (isSign == '1') {
      this.getOrder(wx.getStorageSync('userid'));
      this.setData({
        sign: true,

      })

    } else if (isSign == '0') {
      this.setData({
        sign: false

      })
      wx.switchTab({
        url: '../my/my',
        success: function (res) {

        },
        fail: function () {

        },
        complete: function () {
          // complete
        }
      })

    }
  },
  goshop: function (event) {
    wx.switchTab({
      url: '../homePage/homePage',
      success: function (res) {
        // success
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })


  },
  getOrder: function (userId) {
    var that = this;
    var url = ip + '/biyedesign/public/index.php/miniAPI/v1.getorder/getorder';
    wx.request({
      url: url,
      data: {
        uid: userId

      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function (res) {
        // success
        if (res.data) {
          that.getOrderDetail(res.data);
          that.setData({
            noshoppingView: false,
            shoppingView: true
          })
        } else if(res.data==0){
          that.setData({
            noshopping: '/images/kong.png',
            noshoppingView: true,
            shoppingView: false
          })
        }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })




  },
  getOrderDetail: function (data) {
    console.log(data);
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
    var viewList = data;

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


      // console.log(imgList);

      console.log(imgList);
      var productInfo = new Object();
      productInfo.userImage = viewList[count]['userImage'];
      productInfo.username = viewList[count]['username'];
      productInfo.productTitle = viewList[count]['productTitle'];
      productInfo.productDetail = viewList[count]['productDetail'];
      productInfo.price = viewList[count]['price'];
      productInfo.productPhone = viewList[count]['productPhone'];
      productInfo.productionId = viewList[count]['pid'];
      productInfo.issueId = viewList[count]['uid'];
      productInfo.userId = wx.getStorageSync('userid');

      productInfo.list = [];
      for (i = 0; i < imgList.length; i++) {
        productInfo.list[i] = imgList[i];

      }
      homePageList[homePageCount++] = productInfo;

      //  homePageList[homePageCount++]={
      //      userImage:viewList[count]['userImage'],
      //      username:viewList[count]['username'],
      //      productTitle:viewList[count]['productTitle'],
      //      productDetail:viewList[count]['productDetail'],
      //      price:viewList[count]['price'],
      //     img:imgList


      //   }
      //homePageList[homePageCount].List(list);
      //  homePageCount++
      // homePageList[homePageCount++]=homePage;
      //homePageList[]
      console.log(homePageList);

      imgList = [];
    }

    this.setData({
      viewList: homePageList


    })
    homePageList = [];
  },
  
  deleteShopping:function(event){
      var postId = event.currentTarget.id;
      var that = this;
      var url = ip + '/biyedesign/public/index.php/miniAPI/v1.delshoppingcar/delshoppingcar';
      wx.request({
        url: url,
        data: {
            uid:this.data.viewList[postId].userId,
            pid:this.data.viewList[postId].productionId
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
           "Content-Type": "application/x-www-form-urlencoded"

        }, // 设置请求的 header
        success: function(res){
          // success
      if(res.data==1){
           wx.showToast({
            title: '删除购物车成功',
            icon: 'success',
            duration: 2000
          })
           setTimeout(function(){
                 that.getOrder(wx.getStorageSync('userid'));
                
           })
        }else if(res.data==0){



          }
        },
        fail: function(res) {
          // fail
        },
        complete: function(res) {
          // complete
        }
      })
  },
  payShopping: function (event) {
    var postId = event.currentTarget.id;
    console.log(postId);
    console.log(this.data.viewList[postId]);
    var that = this;
    var url = ip + '/biyedesign/public/index.php/miniAPI/v1.Isorder/Isorder';
    wx.request({
      url: url,
      data: {
        pid: this.data.viewList[postId].productionId

      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"

      }, // 设置请求的 header
      success: function(res){
           console.log(res.data);
        if(res.data==0) {
       
          wx.showToast({
            title: '无法购买，以下架或者被购买,请删除',
            icon: 'success',
            duration: 3000
          })
        } else if(res.data==1) {
          wx.navigateTo({
            url: '../pay/pay?productDetail=' + JSON.stringify(that.data.viewList[postId]),
            success: function (res) {
              // success
            },
            fail: function (res) {
              // fail
            },
            complete: function (res) {
              // complete
            }
          })


        }
      },

    })
  },
  onHide: function (options) {

  },
  onUnload: function (options) {


  },


})