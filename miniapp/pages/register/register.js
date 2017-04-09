Page({
    usernameInput:function(e){
       this.setData({
          username:e.detail.value
           
       })

    },
    passwordInput:function(e){
       this.setData({
         password:e.detail.value
           
       })
    },
    confirmInput:function(e){
        this.setData({  
            confirm:e.detail.value
           
       })
    },
    registerBtnClick:function(e){
        if(this.data.username==null||this.data.password==null||this.data.firm==null){
              wx.showModal({
                 title:'温馨提示',
                 content:'您还没有输入用户名或者密码',
                 showCancel:false,

              })
        }else if(this.data.password!=this.data.firm==null){
               wx.showModal({
                 title:'出问题了',
                 content:'两次密码输入不一致',
                 showCancel:false,

              })

        }

    }
     

})