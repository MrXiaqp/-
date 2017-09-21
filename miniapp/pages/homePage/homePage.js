
 //保存显示的页面
// var  homePageList=[];
var ip = wx.getStorageSync('ip');

var app = getApp();
//起始页
var page;
//每页加载的数据
var page_size = 8;


Page({
    data:{
      list:[],
       phoneImageUrl:"http://img2.ph.126.net/orGpr640GnoUCY8LIiieDQ==/6631878105770979815.png",
       xiangjiImageUrl:"/images/shuma.png",
       zixingSrc:"http://img0.ph.126.net/z2IQdVXhszYN4mrrAiKvHQ==/6632436657675800829.png",
        tushuSrc:"http://img0.ph.126.net/KZv_ootOB65g5RANAuLiRQ==/6632200262678502048.png",
      hidden:true
   },
  onLoad:function(options){
      // this.get
    //this.getList();
    page=1;
    this.getList(page);
  },
  onReady:function(){
    //生命周期函数--监听页面初次渲染完成

  },
  onShow:function(){
    var that= this;
   

    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
 
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
 
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
   
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
   
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  detail:function(event){
    var postId=event.currentTarget.id;
    console.log(postId);
    //app.globalData.middleProduct=this.data.viewList[postId]
    wx.navigateTo({
      url: '../productDetail/productDetail?productDetail=' + JSON.stringify(this.data.viewList[postId]),
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
  
  onScrollLower:function(){
    var that = this;
    this.setData({

      hidden:false

    })
    
   
    setTimeout(function(){
      console.log('加载更多');
      page++;
      that.getList(page);


    },3000)
   

   },
  // upScrollLowerup:function(){
  //   var that = this;
  //   this.setData({

  //     hidden: false,
  //     list:[]
  //   })
   
    
  //   console.log('加载更多');
  //   setTimeout(function () {

  //     that.onLoad();


  //   }, 4000)

       



  // // },
  onPullDownRefresh: function () {
    var that = this;
    this.setData({

      hidden: false,
      list: []
    })


    console.log('刷新');
    setTimeout(function () {

      that.onLoad();


    },3000)

  },
 

  getList:function(page){
   
     
    var that = this;
    // var ip ='http://10.202.232.4';
    var url = ip + '/biyedesign/public/index.php/miniAPI/v1.getproduct/getproduct';
    wx.request({

      url: url,
      data: {
        id: wx.getStorageSync('userid'),
        school: wx.getStorageSync('school'),
        page:page,
        page_size: page_size,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function (res) {
        wx.stopPullDownRefresh()
        //获取list
        var list = that.data.list;
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
        //保存显示的页面
        var homePageList = [];
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
        for (var i = 0; i < homePageList.length;i++){
              list.push(homePageList[i]);
         }
       
       
       
       
        that.setData({
          viewList: list,
          //page: that.data.page,
        })
        
        console.log(page);
        that.setData({

          hidden:true,

        })
        //homePageList=[];
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
   
   
   
   
   },
  toSearch:function(event){
      var search = event.detail.value;
      console.log(search);
      wx.navigateTo({
        url: '../searchAndSortPage/searchAndSortPage?search='+search,
      })
        

  },
  sort:function(e){
    var sort = e.currentTarget.id;
    
    console.log(sort);
    wx.navigateTo({
      url: '../sortlist/sortlist?sort=' + sort,
    })


  }

  
  

  
})
 