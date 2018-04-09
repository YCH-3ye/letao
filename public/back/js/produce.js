/**
 * Created by yeye on 2018/4/9.
 */
$(function() {
//  渲染表单函数
  var currentPage = 1;
  var pageSize = 5;
  var picArr = [];
  function render () {
    $.ajax({
      url:'/product/queryProductDetailList',
      data:{
        page:currentPage,
        pageSize: pageSize,
      },
      success:function(info){
        var str = template('table-tmp',info);
        $('tbody').html(str);

        //  分页
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentPage,//当前页
          totalPages: Math.ceil(info.total/pageSize),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          },
          itemTexts:function(type, page, current) {
            switch( type ) {
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "page":
                return page;
            }
          },
          tooltipTitles:function(type, page, current) {
            switch( type ) {
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "page":
                return page;
            }
          },
          //使用bootstrap样式的提示框组件
          useBootstrapTooltip:true,
        });

      }
    })
  }
  render();

//  点击让模态框显示
  $('.addbtn').on('click',function() {
    $('#addform').modal('show');

  //  渲染下拉菜单
    $.ajax({
      url:"/category/querySecondCategoryPaging",
      data:{
        page:1,
        pageSize:100,
      },
      success:function(info) {
        console.log(info);
        var str = template('down-tmp',info);
        $('.dropdown-menu').html(str);


      }
    })
  });

//  给下拉菜单添加点击事件并把他的内容加载下拉菜单中
  $('.dropdown-menu').on('click','a',function() {
    console.log(23);
    //获取所选列表中的id和text内容
    var txt = $(this).text();
    var id = $(this).data('id');
    console.log(id);
    console.log(txt);
  //  将获取到的id存到真正的下拉列表中的value中，将假的下拉列表的值换成选中的txt值
    $('#dropdownMenu1').text(txt);
    $('[name="brandId"]').val(id);
  })

//  4.配置上传图片回调函数
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);

      var picObj = data.result;
      var picAddr = picObj.picAddr;

    //  将新得到的图片对象,推到数组的最前面
      picArr.unshift(picObj);
    //  新图片应该添加到imgBox 最前面去
      $('#imgBox').prepend('<img src="'+picAddr+'"width="100">');

      //如果长传的图片个数大于3个，需要将大于3的那个图片去除掉
      if(picArr.length>3) {
      //  删除数组中的最后一项
        picArr.pop();
        $("#imgBox img:last-of-type").remove();
      }
      if(picArr.length == 3) {
        $('#form').data("bootstrapValidator").updateStatus("picStatus","VALID");
      }

    }
  });


//  配置表单验证
  $('#form').bootstrapValidator({
  //  将默认排除项，重置掉(默认会对：hidden, : disabled等进行排除)
    excluded:[],
  //  配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

  //  配置校验字段
    fields:{
      //  二级分类id，归属品牌
      brandId:{
        validators:{
          notEmpty: {
            message:"请选择二级分类",
          }
        }
      },
      //  商品名称
      proName:{
        validators:{
          notEmpty: {
            message:"请输入商品名称",
          }
        }
      },
      //  商品描述
      proDesc:{
        validators:{
          notEmpty: {
            message:"请输入商品描述",
          }
        }
      },
      //  商品存库
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },

      num:{
        validators:{
          notEmpty: {
            message:"请输入商品存库",
          },
        //  正则校验
          regexp: {
            regexp:/^[1-9]\d*$/,
            message:'商品库存格式,必须是非零开头的数字'
          }
        }
      },

      //  尺码校验
      size:{
        validators:{
          notEmpty: {
            message:"请输入商品尺码",
          },
          //  正则校验
          regexp: {
            regexp:/^\d{2}-\d{2}$/,
            message:'尺码格式,必须是32-40'
          }
        }
      },
      // 商品价格
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品价格"
          }
        }
      },
      // 商品原价
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      // 标记图片是否上传满三张
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  })


//  6.注册校验成功事件
  $('#form').on('success.form.bv',function(e){

    e.preventDefault();

  //  获取表单提交得到参数字符串
    var params = $('#form').serialize();

    params += "$picName1="+picArr[0].picName+"$picAddr1="+picArr[0].picAddr;
    params += "$picName2="+picArr[1].picName+"$picAddr2="+picArr[1].picAddr;
    params += "$picName3="+picArr[2].picName+"$picAddr3="+picArr[2].picAddr;

    console.log(params);

    $.ajax({
      url:'/product/addProduct',
      type:'post',
      data:params,
      success:function(info) {
        console.log(info);
        if(info.success) {
        //  关闭模态框
          $('#addform').modal('hide');
          $('#form').data('bootstrapValidator').resetForm(true);

          currentPage = 1;
          render();

          $('#dropdownText').text("请选择二级分类");

          $('#imgBox img').remove();
          picArr = [];
        }
      }
    })
  })




})