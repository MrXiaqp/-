
var productDetail = [];
var ip = wx.getStorageSync('ip');
Page({

  data: {

    //src:'http://img0.ph.126.net/n_ErNCuku6AgIqKCHDlywQ==/6631858314561681033.jpg',
    //productImg:'http://img0.ph.126.net/n_ErNCuku6AgIqKCHDlywQ==/6631858314561681033.jpg'

  },
  onLoad: function (options) {
    productDetail = JSON.parse(options.productDetail);
    console.log(productDetail);
    this.getAddressDetail(productDetail.userId);
    this.setData({
      src: productDetail.userImage,
      issueName: productDetail.username,
      productImg: productDetail.list[0],
      title: productDetail.productTitle,
      content: productDetail.productDetail,
      price: productDetail.price,
      Orderstyle: wx.getStorageSync('Ordersort')


    })
  },
  onShow: function (event) {

    this.setData({

      Orderstyle: wx.getStorageSync('Ordersort')
    })

  },
  getAddressDetail: function (uid) {
    var that = this;
    var url = ip + '/biyedesign/public/index.php/miniAPI/v1.getAddress/getAddress';
    wx.request({
      url: url,
      data: {
        uid: uid

      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function (res) {
        // success

        if (res.data) {
          console.log(res.data);
          that.setData({
            getName: res.data[0].receptName,
            getPhone: res.data[0].receptPhone,
            getAddress: res.data[0].receptAddress
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
  peisongstyle: function (event) {
    wx.navigateTo({
      url: '../orderstyleSort/orderstyleSort',
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
  confirmButton: function (event) {
    var that = this;
    var url = ip + '/biyedesign/public/index.php/miniAPI/v1.confrimorder/confrimorder';
    wx.request({
      url: url,
      data: {
        pid: productDetail.productionId,
        uid: productDetail.userId,
        orderStyle: wx.getStorageSync('Ordersort')
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"

      }, // 设置请求的 header
      success: function (res) {
      
        // success
        if (res.data) {
          wx.showToast({
            title: '购买成功',
            icon: 'success',
            duration: 3000
          }),
            setTimeout(function () {
              wx.navigateBack({
                delta: 1, // 回退前 delta(默认为1) 页面
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
            },3000)




        }
      },

    })





  }


})