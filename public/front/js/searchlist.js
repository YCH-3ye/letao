$(function() {



  var id = get('id');
  $('.lt-search input').val(id);
console.log(id);

  $('.lt-search button').on('click',function() {
  //  获取搜索框中的内容
    var str = $('.lt-search input').val();
    console.log(str);
  //  获取localstroage的中的内容
    var arrstr = JSON.parse(localStorage.getItem('search-list'))||'[]';
    console.log(arrstr);
    if(arrstr.indexOf(str) !== -1) {
      var index = arrstr.indexOf(str);
      arrstr.splice(index,1);
    };
  //  将input数据添加到localStorage中
    arrstr.unshift(str);
    console.log(arrstr);
    localStorage.setItem('search-list',JSON.stringify(arrstr));

    render();
  })

  render();

  $('.search-title a[data-type]').on('click',function() {
    if($(this).hasClass("current")){
      $(this).find('i').toggleClass("fa-angle-down").toggleClass('fa-angle-up');
    }else {
      $(this).addClass('current').parent().siblings().find('a').removeClass('current');
      $(this).parent().siblings().find('a').find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
    }
    render();
  })

  function render() {

    var params = {};

    params.proName = $('.lt-search input').val();
    params.page = 1;
    params.pageSize = 100;

    //获取有current类的元素
    var $current = $('.search-title .current');

    if($current.length>0) {
    //  有高亮的元素需要排序
      var sortName = $current.data('type'); //price, num

      var sortValue = $current.find('i').hasClass('fa-angle-down')? 2:1;

      params[sortName] = sortValue;
    }

    setTimeout(function() {
      $.ajax({
        url:'/product/queryProduct',
        type: "get",
        data:params,
        success: function(info) {
          console.log(info);
          var str = template('produce-tmp',info);
          $('.produce').html(str);

        }
      })
    },500);

  }


})