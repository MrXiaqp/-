var image;
Page({
  data: {
    userImg: " ",
    selectImg: true,
    usersImg: false,
  },
  onLoad: function (options) {
    this.setData({
      username: '',
      password: '',
      confirm: '',
      selectImg: true,
      usersImg: false,
    })

  },
  onshow:function(options){
    this.setData({
       selectImg: true,
        usersImg: false,

    })
  },
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value

    })


  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value

    })
  },
  confirmInput: function (e) {
    this.setData({
      confirm: e.detail.value

    })
  },
  changeImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        that.setData({
          userImg: res.tempFilePaths,
        })
        image = res.tempFilePaths[0];
        console.log(image);
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })


  },
  selectImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        that.setData({
          selectImg: false,
          usersImg: true,
          userImg: res.tempFilePaths,

        })
        image = res.tempFilePaths[0];
        console.log(image);
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })

  },
  registerBtnClick: function (e) {
    if (this.data.username.length == 0 || this.data.length == 0 || this.data.confirm.length == 0) {
      wx.showModal({
        title: '温馨提示',
        content: '您还没有输入用户名或者密码',
        showCancel: false,

      })
    } else if (this.data.password != this.data.confirm) {
      wx.showModal({
        title: '出问题了',
        content: '两次密码输入不一致',
        showCancel: false,

      })

    } else {
      var that = this;
      var ip = wx.getStorageSync('ip')
      var url =ip+'/biyedesign/public/index.php/miniAPI/v1.adduser/addlogin';
      wx.uploadFile({
        url: url,
        filePath: image,
        name: 'userImg',
        header: {
          "Content-Type": "multipart/form-data"
        }, // 设置请求的 header
        formData: {
          username: this.data.username,
          password: this.data.password,
        }, // HTTP 请求中其他额外的 form data
        success: function (res) {

          console.log(res.data);
          if (res.data==1){
              wx.showModal({
                title: '提示',
                content: '您已经成功的注册用户',
                showCancel: false,
                success: function (res) {
                  if (res.confirm){
                    console.log('1');
                    that.setData({
                      username: '',
                      password: '',
                      confirm: '',
                     })

                  }
                }
              })
            }else {
              wx.showModal({
                title: '错误',
                content: '出现未知错误',
                showCancel: 'false'
              })
            }

          },
        fail: function (res) {
            var that = this;
   
          wx.showModal({
            title: '错误',
            content: '网络出现问题',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                that.setData({
                  username: '',
                  password: '',
                  confirm: ''
                })
              }
            }
          })
        },
        complete: function (res) {
          // complete
        }
      })







      // wx.request({
      //   url: 'http://localhost/biyedesign/public/index.php/miniAPI/v1.adduser/addlogin',
      //   data: {
      //     username: this.data.username,
      //     password: this.data.password,
      //   },
      //   method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      //   header: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   }, // 设置请求的 header
      //   success: function (res) {
      //     console.log(res.data);
      //     if (res.data == 1) {
      //       wx.showModal({
      //         title: '提示',
      //         content: '您已经成功的注册用户',
      //         showCancel: false,
      //         success: function (res) {
      //           if (res.confirm) {

      //             // username: this.data.username,
      //             // password: this.data.password,
      //             console.log('1');
      //             that.setData({
      //               username: '',
      //               password: '',
      //               confirm: '',
      //             })

      //           }
      //         }
      //       })
      //     } else {
      //       wx.showModal({
      //         title: '错误',
      //         content: '出现未知错误',
      //         showCancel: 'false'
      //       })
      //     }
      //   },
      //   fail: function (res) {
      //     var that = this;
      //     // fail
      //     wx.showModal({
      //       title: '错误',
      //       content: '网络出现问题',
      //       showCancel: false,
      //       success: function (res) {
      //         if (res.confirm) {
      //           that.setData({
      //             username: '',
      //             password: '',
      //             confirm: ''
      //           })
      //         }
      //       }
      //     })

      //   },
      //   complete: function (res) {
      //     // complete
      //   }
      // })
    }

  }


})