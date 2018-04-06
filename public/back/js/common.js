/**
 * Created by yeye on 2018/4/6.
 */


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