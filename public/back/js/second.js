/**
 * Created by yeye on 2018/4/8.
 */
$(function() {
  var currentPage = 1;
  var sizePage = 5;
    function render() {
      $.ajax({
        url:'/category/querySecondCategoryPaging',
        data:{
          page:currentPage,
          pageSize: sizePage
        },
        success:function(info) {
          console.log(info);
          $('tbody').html(template('table-tmp',info));


        //  添加分页功能
          $('#pagintor').bootstrapPaginator({
            bootstrapMajorVersion: 3,
            currentPage: currentPage,//当前页
            totalPages: Math.ceil(info.total/info.size),//总页数
            size: "small",//设置控件的大小，mini, small, normal,large
            onPageClicked: function (event, originalEvent, type, page) {
              //为按钮绑定点击事件 page:当前点击的按钮值
              currentPage = page;
              render();
            }
          });
        }
      })
    }
  render();



  $('.addbtn').on('click',function() {
    console.log(234);
    $('#addform').modal('show');

    $.ajax({
      url:'/category/queryTopCategoryPaging',
      data:{
        page:1,
        sizepage:100
      },
      success:function(info) {
        console.log(info);
        $('.dropdown-menu').html(template('down-tmp',info));
      }
    })
  })



//  给下拉菜单中的a标签添加点击事件
  $('.dropdown-menu').on('click','a',function() {
    console.log(234);
    var id = $(this).data('id');
    var txt = $(this).text();

    $('#dropdownMenu1').text(txt);
    $('[name="categoryId"]').val(id);

    $('#form').data('bootstrapValidator').updateStatus('categoryId',"VALID");

  });

  $('#fileupload').fileupload({
    dataType:"json",
    done:function (e, data) {
      console.log(data);
      //获取长传成功的图片地址
      var picAddr = data.result.picAddr;
    //  设置图片地址
      $('#imgBox img').attr('src',picAddr);
    //  将图片地址存在隐藏域中
      $('[name="brandLogo"]').val(picAddr);

    //  重置校验状态
      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  })


  $('#form').bootstrapValidator({
    excluded:[],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
    //
      categoryId: {
        validators:{
          notEmpty: {
            message: '请选择一级分类',
          }
        },
      },
      brandName: {
        validators:{
          notEmpty: {
            message: '请选择一级分类',
          }
        },
      },

      brandLogo: {
        validators:{
          notEmpty: {
            message: '请选择一级分类',
          }
        },
      }


    }

  })

//  添加二级菜单类
  $('#form').on('success.form.bv',function(e) {
    e.preventDefault();
    $.ajax({
      url:"/category/addSecondCategory",
      type:'post',
      data:$('#form').serialize(),
      success:function(info) {
        console.log(info);
        $('#addform').modal('hide');
      //  重置表单里面的内容和校验状态
        $('#form').data('bootstrapValidator').resetForm( true );

      //  重新渲染第一页
        currentPage = 1;
        render();

      //  并让下拉菜单文本重置
        $('#dropdownText').text('请选择1级分类');

      //  让图片重置
        $('#imgBox img').attr('src',"images/none.png");
      }

    })
  })

})