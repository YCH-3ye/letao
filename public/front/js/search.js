/**
 * Created by yeye on 2018/4/10.
 */
$(function() {
//  创建一个数组用于存储到localStorge中
//    点击搜索按钮获取input表单中的值

    //获取浏览器中的localstorage中的值
    //如果浏览器中localstorage中有search-list的值就把值传给数组，反之则将空数组json字符串传给字符串


  //初始化渲染页面
  render();

  //点击小删除
  $('.lt-container').on('click','.btn_delete',function() {
    var id = $(this).data('id');
    console.log(id);
    var arrstr = getArr();
    console.log(arrstr);
    arrstr.splice(id,1);
    localStorage.setItem("search-list", JSON.stringify(arrstr));
    render();
  })

  //全选删除
  $('.lt-container').on('click','.content-title span',function(){
    mui.confirm('你是否要清除所有的历史记录？','温馨提示',['删除','确认'],function(e) {

      if(e.index == 1){
        localStorage.removeItem('search-list');
        render();
      }



    });
  });



  //点击按钮添加新的搜索记录
  $('.lt-search button').on('click',function() {



      var str = $('.lt-search input').val();
    //将获取的表单数组添加到数组中在吧获取好的数组放到localStroage中
    if(str == ""){
      mui.toast('请输入搜索信息',{ duration:2000, type:'div' });
      return;
    }
    var arrstr = getArr();
     //判断搜索的信息是否重复，有过有将数据提到最前面

    if(arrstr.indexOf(str) !== -1) {
      var index = arrstr.indexOf(str);
      console.log(index);

      arrstr.splice(index,1);
    }

    //历史记录最多保存10条

    if(arrstr.length >=10) {
      arrstr.pop();
    }



    arrstr.unshift(str);

    var tmp = template("search-tmp",{arr:arrstr});
    $('.search-content').html(tmp);
    //再将arrstr数组中的对象存到localStrorage中
    localStorage.setItem("search-list",JSON.stringify(arrstr));

    $('.lt-search input').val("");

  //  跳转到搜索列表
    location.href = "searchList.html?id="+str;
  })



  function getArr() {
    var str = localStorage.getItem("search-list")||"[]";
    var arrstr = JSON.parse(str);
    return arrstr;
  }

  function render() {
    var arrstr = getArr();

    var tmp = template("search-tmp",{arr:arrstr});
    $('.search-content').html(tmp);
    //再将arrstr数组中的对象存到localStrorage中
    localStorage.setItem("search-list",JSON.stringify(arrstr));
  }



})