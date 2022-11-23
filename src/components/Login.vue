<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>

      <!--登录表单区域-->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!--这是使用element-ui的第三步，完成。:model="loginForm"表示该表单填写的数据都会自动同步到loginForm对象上。:rules表单验证。ref表示该表单的实例对象-->
        <el-form-item label prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-bussiness-man"></el-input>
          <!--这是使用字体图标的第二步，完成，使用阿里图标图必须写iconfont-->
        </el-form-item>
        <el-form-item label prop="password">
          <el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-unlock"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: '',
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' }, // trigger: 'blur'表示文本框失去焦点时触发这次校验
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    //点击重置按钮，重置表单
    resetLoginForm() {
      //console.log(this) 输出loginFormRef，也就是ref="loginFormRef"，表示当前表单的实例对象
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate((valid) => {
        //对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。valid是一个boolean值，是该验证的结果,
        if (!valid) return;
        let _this = this;
        let param = new URLSearchParams();
        param.append('username', this.loginForm.username);
        param.append('password', this.loginForm.password);
        this.$http
          .post('/user/login', param) //login参数表示请求地址，this.loginForm表示请求参数
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.success('登录成功');
              // 1 将登录成功之后的token，保存到客户端的sessionStorage中
              //  1.1 项目中出除了登录之外的其他api接口，必须在登录之后才能访问
              //  1.2 token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
              window.sessionStorage.setItem('token', res.data.data);
              // 2. 通过编程式导航跳转到后台主页，路由地址是/home
              this.$router.push('/home');
            } else {
              this.$message.error('登录失败!');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    },
  },
};
</script>

<style lang="less" scoped>
//less表示一种语法；scoped表示这个style在只在当前组件生效
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute; //该div盒子就能进行页面上的位移了
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); //该div盒子就在中间了

  .avatar_box {
    //语法嵌套
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: floralwhite;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0; //底部对齐
  width: 100%;
  padding: 0 20px; //内边距上下都为0，左右为20px；但是输入框的右边超出了login_box盒子
  box-sizing: border-box; //解决输入框的右边超出了login_box盒子的问题
}
.btns {
  //把登录和取消按钮从左边移动右边对齐
  display: flex; //变成弹性模型
  justify-content: flex-end; //横轴上尾部对齐
}
</style>