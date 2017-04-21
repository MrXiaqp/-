Page({
data:{
       computerImageUrl:"http://img2.ph.126.net/K2KTnoqw2fRgORpU_peGgw==/6631927583794230662.jpg",
       lightImageUrl:"http://img1.ph.126.net/8AsZ90TPnd3rzNWk5wUa_w==/6632543310303115360.jpg",
       xieImageUrl:"http://img0.ph.126.net/n_ErNCuku6AgIqKCHDlywQ==/6631858314561681033.jpg",
       phoneImageUrl:"http://img2.ph.126.net/orGpr640GnoUCY8LIiieDQ==/6631878105770979815.png",
       xiangjiImageUrl:"http://img2.ph.126.net/4SeRb5ES63Atcie2pzD-NA==/6632076017863981967.png",
       autherImageUrl:"http://img1.ph.126.net/uRCgWnh4wA-wJ3KG7YpJpQ==/6631897896980281168.png",
       specialImageUrl:"http://img1.ph.126.net/7IL27gxsKKsYhc7OpIjS6g==/6632497130814747154.png"
      
   },
    onLoad:function(options){
      this.setData({
         src:"/images/收藏.png"
       
      })
   
    },
    scrollevent:function(event){
        console.log('1');
    },
    
    collectionEvent:function(event){
       this.setData({
         src:"/images/收藏2.png"
       
      })
   
    }
})