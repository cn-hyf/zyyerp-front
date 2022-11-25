<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图区域-->
    <el-card class="box-card">
      <!--搜索区域-->
      <el-row :gutter="20">
        <!--gutter表示列与列的间隙-->
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加仓库</el-button>
        </el-col>
      </el-row>
      <!--仓库列表区域-->
      <el-table :data="warehouselist" style="width: 100%" :border="true" :stripe="true">
        <el-table-column type="index"></el-table-column> <!--索引列-->
        <el-table-column prop="whName" label="仓库名称" width="180"></el-table-column>
        <el-table-column prop="profitCenter" label="利润中心" width="180"></el-table-column>
        <el-table-column prop="whAddress" label="仓库地址" width="180"></el-table-column>
        <el-table-column prop="whCapacity" label="仓库总容量" width="180"></el-table-column>
        <el-table-column prop="whRemarks" label="备注" width="180"></el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope="scope"> <!--slot-scope表示作用域插槽，scope.row会把一条数据拿出来-->
            <el-switch :active-value="1" :inactive-value="0"  v-model="scope.row.whStatus"> 
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="3000px">
          <template slot-scope="scope">
            <!--查看按钮-->
            <el-button type="success" icon="el-icon-search" size="mini">查看</el-button>
            <!--修改按钮-->
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <!--删除按钮-->
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //获取仓库列表的参数对象
      queryInfo: {
        query: '',
        papeNum: 1,
        pageSize: 2,
      },
      warehouselist: [],
    };
  },
  created() {
    this.getWarehourseList();
  },
  methods: {
    // 获取仓库列表
    getWarehourseList() {
      this.$http
        .get('/warehouse/list', this.queryInfo)
        .then((res) => {
          if (res.data.code == 200) {
            this.warehouselist = res.data.data.list;
          } else {
            this.$message.error('获取数据失败!');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>