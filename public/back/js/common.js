/**
 * Created by yeye on 2018/4/6.
 */

//配置禁用 小圆环
NProgress.configure({ showSpinner:false });

//所有ajax开始调用 ajaxStart
$(document).ajaxStart(function() {
  NProgress.start();
});


$(document).ajaxStop(function() {
//  模拟网络延迟
  setTimeout(function() {
    NProgress.done();
  },500)
})

//判断员工是否登录 登录拦截
//判断登陆的网址是不是login.html页面如果是则不需要验证

if(location.href.indexOf('login.html') == -1) {
  $.ajax({
    url:"/employee/checkRootLogin",
    dataType:'json',
    success:function(info) {
      console.log(info);
      if(info.error === 400) {
        location.href = "login.html";
      }
      if(info.success) {
        console.log('登录成功了');
      }
    }
  })
}


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

