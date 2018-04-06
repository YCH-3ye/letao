/**
 * Created by yeye on 2018/4/6.
 */

$(function() {
  $('.aside-nav li a').on('click',function() {
    $('.aside-nav li a').each(function(i,v) {
      $(this).removeClass('active');
    })
    $(this).toggleClass('active');
  })
  $('.list').on('click',function() {
    $(this).next().stop().slideToggle();
  })

  $('.top-left').on('click',function() {
    console.log(23);
    $('.aside').toggleClass('toggle');
    $('.main-top').toggleClass('toggle');
    $('.main-container').toggleClass('toggle');
  })



  $('.top-right').on('click',function() {
    $('.modal').modal('show');
  })
  $('.logoutBtn').on('click',function() {
    console.log(234);
    $.ajax({
      url:'/employee/employeeLogout',
      type:'get',
      dataType:'json',
      success:function(info) {
        if(info.success) {
          location.href = "login.html";
        }
      }
    })
  })
})
