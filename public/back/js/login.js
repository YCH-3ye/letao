/**
 * Created by yeye on 2018/4/6.
 */
$(function() {
  $('.form-horizontal').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message:"用户名不能为空"
          },
          stringLength: {
            min: 2,
            max: 6,
            message:"用户名长度必须是2到6之间"
          },
          callback: {
            message:'用户名不存在'
          }
        },
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message:"密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 10,
            message:"密码长度必须是6到10之间"
          },
          //专门用于配置回调提示信息的校验规则
          callback: {
            message:'密码错误'
          }
        },
      }


    }
  })

//  进行登录请求
  $('#form').on("success.form.bv",function(e) {
    console.log(234);
    //当验证成功的时候阻止表单的默认提交
    e.preventDefault();
    //使用ajax进行提交
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info) {
        console.log(info);
        if(info.success) {
          location.href = "index.html";
        }

        if(info.error === 1000) {
          //用户名不存在
          $('#form').data('bootstrapValidator').updateStatus("username",'INVALID','callback');
        }
        if(info.error === 1001) {
          $('#form').data('bootstrapValidator').updateStatus('password',"INVALID",'callback');
        }
      }
    })
  });

  //3.重置功能实现
  $('[type="reset"]').on('click',function() {
    console.log(11);
    $('#form').data('bootstrapValidator').resetForm();
  });
})