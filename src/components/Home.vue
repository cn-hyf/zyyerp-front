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
      <el-aside :width="isCollapse ? '64px' : '200px' ">  <!--isCollapse为true时表示折叠，宽度为64px；isCollapse为false时表示展开，宽度为200px-->
        <div class="toggle-button" @click="toggleCollapse">|||</div>  
        <!--侧边栏菜单区域，使用两个for循环，外循环是一级菜单，内循环是二级菜单-->
        <el-menu background-color="#333747" text-color="#fff" active-text-color="#409EFE" 
        :unique-opened="true" 
        :collapse="isCollapse" 
        :collapse-transition="false" 
        :router="true"  
        :default-active="activePath">   <!--router表示是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转。default-active当前激活菜单的 index,用来实现选中的左侧菜单高亮-->
          <!--一级菜单 说明：index保存的是字符串，但item.id是数值，需要把数值变成字符串：item.id + ''  就是变成字符串-->
          <el-submenu :index="item.id+ ''" v-for="item in menulist" :key="item.id">  
            <!--一级菜单的模板区域-->
            <template slot="title">
              <!--图标-->
              <i :class="item.icon"></i>
              <!--文本-->
              <span>{{item.title}}</span>
            </template>
            
             <!--二级菜单-->
            <el-menu-item :index="'/' + subItem.name" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.name)">
              <!--二级菜单的模板区域-->
              <template slot="title">
                <!--图标-->
                <i :class="subItem.icon"></i>
                <!--文本-->
                <span>{{subItem.title}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--页面内容主体-->
      <el-main>
        <!--路由占位符-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return {
      // 左侧菜单数据
      menulist: [],
      isCollapse: false,
      //被激活的链接地址，用来实现左侧菜单栏的高亮
      activePath: ''
    }
  },  
  created(){
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear(); // 清空token
      this.$router.push('/login'); // 跳转到登录页面
    },
    // 拉取所有的菜单
    getMenuList(){
      this.$http
          .get('/menu/treeList') //login参数表示请求地址，this.loginForm表示请求参数
          .then((res) => {
            if (res.data.code == 200) {
              this.menulist = res.data.data
            } else {
              this.$message.error('获取数据失败!');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    // 点击按钮，切换左侧菜单的折叠与展开
    toggleCollapse(){
      this.isCollapse = !this.isCollapse  // isCollapse取反，true变成false，false变成true
    },
    // 保存链接的激活状态，用来实现左侧菜单栏的高亮
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath);
      this.activePath = activePath
    }
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
  .el-menu{
        border-right: none;   //解决左侧菜单栏的那条直线突出问题
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont{
  margin-right: 10px;
}
.toggle-button{
  background-color: #4A5064;
  font-size: 10px;  
  line-height: 24px;
  color: #fff;
  text-align: center;   // 字体居中
  letter-spacing: 0.2em;  //字体间隔
  cursor: pointer; // 鼠标放上去变成小手的模式

  
}
</style>