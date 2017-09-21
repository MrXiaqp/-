
var productDetail = {};
var ip = wx.getStorageSync('ip');
Page({
  data: {


  },
  onLoad: function (options) {

    productDetail = JSON.parse(options.productDetail);
    console.log(productDetail);
    console.log(productDetail.userImage);
    this.setData({

      viewlist: productDetail.list,
      title: productDetail.productTitle,
      price: productDetail.price,
      productContent: productDetail.productDetail,
      phone: productDetail.productPhone
    })
    this.isCollection(productDetail.productionId,productDetail.userId);
  },
  isCollection: function (pid,uid) {
    console.log(pid);
    var that = this;
    var url = ip + '/biyedesign/public/index.php/miniAPI/v1.getcollection/getcollection';
    wx.request({
      url: url,
      data: {
        productionId: pid,
        userid:uid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function (res) {
        // success
        if (res.data == 0) {
          console.log(0);
          that.setData({
            src: "http://img1.ph.126.net/yUnqXUQ6BuT_OgmruLjFbA==/6632159580748436473.png"
          })
        } else if (res.data == 1) {
          that.setData({
            src: "http://img1.ph.126.net/Rudzia0UdKwDoiJIMA-lZw==/6631978161329852248.png"

          })
          console.log(1);
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
  scrollevent: function (event) {
    console.log('1');
  },

  collectionEvent: function (event) {
    var productionId = productDetail.productionId;
    var userId = productDetail.userId;
    var that = this;
    var url = ip + '/biyedesign/public/index.php/miniAPI/v1.collection/collection';
    wx.request({
      url: url,
      data: {
        productionId: productionId,
        userId: userId
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"

      }, // 设置请求的 header
      success: function (res) {
        // success
        that.isCollection(productionId,userId);
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })


  },
  calling: function (event) {
    wx.makePhoneCall({
      phoneNumber: productDetail.productPhone,
      success: function (res) {
        // success
        console.log("拨打成功");
      }
    })
  },
  nowbuy: function (event) {

    //发布人的商品id 
    var productionId = productDetail.productionId;
    var url1 = ip + '/biyedesign/public/index.php/miniAPI/v1.Isorder/isShop';
    wx.request({
      url: url1,
      data: {
        //uid: wx.getStorageSync('userid'),
        pid: productionId,
        //issueuseid: issueId
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function (res) {
        // success
        if (res.data == 0) {
          wx.showToast({
            title: '无法购买，商品已被卖出',
            icon: 'success',
            duration: 2000
          })

        } else if (res.data == 1) {
          //发布人的id
          var issueId = productDetail.issueId;
          console.log(issueId);
          var that = this;
          var url = ip + '/biyedesign/public/index.php/miniAPI/v1.addorder/addorder';
          wx.request({
            url: url,
            data: {
              uid: wx.getStorageSync('userid'),
              pid: productionId,
              issueuseid: issueId
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            }, // 设置请求的 header
            success: function (res) {
              // success
              if (res.data == 1) {
                wx.showToast({
                  title: '加入购物车成功',
                  icon: 'success',
                  duration: 2000
                })

              } else if (res.data == 0) {
                wx.showToast({
                  title: '已经加入不需要重复加入',
                  icon: 'success',
                  duration: 2000
                })


              }
            }
          })
        }
       }
    })
  }
})