/**
 * Created by yeye on 2018/4/8.
 */

$(function() {
  var currentpage = 1;
  var pageSize = 5;
  function rander() {
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentpage,
        pageSize:pageSize
      },
      success:function(info) {
        console.log(info);
        $('tbody').html(template('table-tmp',info));

        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentpage,//当前页
          totalPages:Math.ceil(info.total/pageSize),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentpage = page;
            rander();
          }
        });
      }
    })
  }
  rander();

  $('.add-container button').on('click',function() {
  //    表单模态框显示
    $('#addform').modal('show');
  })

  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message:'一级分类内容不能为空'
          },
        }
      }
    }
  })


  $('#form').on('success.form.bv',function(e) {
    e.preventDefault();
    $.ajax({
      url:'/category/addTopCategory',
      type:'post',
      data:$('#form').serialize(),
      success:function(info) {
        if(info.success) {
          //关闭模态框
          $('#addform').modal('hide');

          currentpage = 1;
          rander();

          $('#form').data('bootstrapValidator').resetForm(true);
        }
      }
    })
  })
})