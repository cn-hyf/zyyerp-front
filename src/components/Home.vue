<template>
  <el-container class="home-container">
    <!--页面区域-->
    <el-header>
      <div>
        <img src="../assets/xtb.png" alt />
        <span>制衣业管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主体区域-->
    <el-container>
      <!--页面侧边栏-->
      <el-aside width="200px">
        <!--侧边栏菜单区域-->
        <el-menu background-color="#333747" text-color="#fff" active-text-color="#ffd04b">
          <!--一级菜单-->
          <el-submenu index="1">
            <!--一级菜单的模板区域-->
            <template slot="title">
              <!--图标-->
              <i class="el-icon-location"></i>
              <!--文本-->
              <span>导航一</span>
            </template>
            
             <!--二级菜单-->
            <el-menu-item index="1-1">
              <!--二级菜单的模板区域-->
              <template slot="title">
                <!--图标-->
                <i class="el-icon-location"></i>
                <!--文本-->
                <span>选项1</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--页面内容主体-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout() {
      window.sessionStorage.clear(); // 清空token
      this.$router.push('/login'); // 跳转到登录页面
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex; // 用于把图标和退出按钮布局
  justify-content: space-between; // 用于把图标和登录按钮布局，图标左边贴边对齐，退出按钮在右边贴边对齐，还有一定的空隙
  padding-left: 0px; // 用于把图标和退出按钮布局，解决图标左边贴边对齐的空隙
  align-items: center; // 用于把图标和退出按钮布局，解决了登录按钮上下紧贴边的问题
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center; // 制衣业管理系统在el-header上下的中间显示
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
</style>