/**
 * Created by yeye on 2018/4/7.
 */
$(function() {
  var currentPage = 1;
  var pageSize = 5;
  function render() {
    $.ajax({
      url:'/user/queryUser',

      data:{
        page: currentPage,
        pageSize: pageSize
      },
      success:function(info) {
        console.log(info);
        $('tbody').html(template('usertmp',info));
      }
    })
  }
  render();


  $('tbody').on('click','.changebtn',function() {
    $('#judge').modal('show');
    //  获取当前的id
    var id = $(this).parent().data('id');
    var isDelete = $(this).parent().data('isdelete') === 1 ? 0 : 1;
    console.log(isDelete);
    console.log(id);

    $('.confirmBtn').off('click').on('click',function() {
      $.ajax({
        url:'/user/updateUser',
        data:{
          id:id,
          isDelete:isDelete,
        },
        type:'post',
        success:function(info) {
          console.log(info);
          if (info.success) {
            //关闭模态框
            $('#judge').modal('hide');
          //  重新渲染
            render();
          }
        }
      })

    })
  })


})