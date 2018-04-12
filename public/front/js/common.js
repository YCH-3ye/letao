/**
 * Created by yeye on 2018/4/10.
 */
$(function() {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });



})



function get(key) {
  var search = location.search;
  search = decodeURI(search);
  //去掉？
  search = search.slice(1);
  //切割成数组
  var arr = search.split('&');;

  var obj = {};
  arr.forEach(function(element,index){
    var k = element.split('=')[0];
    var v = element.split('=')[1];

    obj[k] = v;
  });
  console.log(obj);
  return obj[ key ];
}
