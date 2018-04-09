/**
 * Created by yeye on 2018/4/10.
 */
$(function() {
  $.ajax({
    url:'/category/queryTopCategory',
    success:function( info) {
      console.log(info);
      var str = template('nav-tmp',info);
      $('.cate-left ul').html(str);
      render(info.rows[0].id);
    }
  })


//  给nav添加点击事件
  $('.cate-left').on('click','a',function() {
    console.log(2344);
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
    var id = $(this).data('id');

    render(id);
  })

  function render(id) {
    $.ajax({
      url:"/category/querySecondCategory",
      data:{id:id},
      success:function(info) {
        console.log(info);
        var str = template('second-tmp',info);
        $('.cate-right ul').html(str);
      }
    })
  }
})