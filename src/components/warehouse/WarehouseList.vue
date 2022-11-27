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
        <el-col :span="4">
          <el-input
            placeholder="请输入仓库名称"
            v-model="queryInfo.query.whName"
            :clearable="true"
            @clear="getWarehourseList"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            placeholder="请输入利润中心"
            v-model="queryInfo.query.profitCenter"
            :clearable="true"
            @clear="getWarehourseList"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-input
            placeholder="请输入仓库地址"
            v-model="queryInfo.query.whAddress"
            :clearable="true"
            @clear="getWarehourseList"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-icon-search" @click="getWarehourseList" type="primary">搜索</el-button>
        </el-col>
        <el-col :span="4">
          <el-button icon="el-icon-add" @click="addDialogVisible = true" type="primary">添加仓库</el-button>
        </el-col>
      </el-row>
      <!--仓库列表区域-->
      <el-table :data="warehouselist" style="width: 100%" :stripe="true">
        <!--索引列-->
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="whName" label="仓库名称" width="180px"></el-table-column>
        <el-table-column prop="profitCenter" label="利润中心" width="180px"></el-table-column>
        <el-table-column prop="whAddress" label="仓库地址" width="180px"></el-table-column>
        <el-table-column prop="whCapacity" label="仓库总容量" width="180px"></el-table-column>
        <el-table-column prop="whRemarks" label="备注" width="180px"></el-table-column>
        <el-table-column label="状态" width="180px">
          <template slot-scope="scope">
            <!--slot-scope表示作用域插槽，scope.row会把一条数据拿出来。1是启用，0是禁用-->
            <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.whStatus"
              @change="stateChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <!--查看按钮-->
            <el-button type="success" icon="el-icon-search" size="mini">查看</el-button>
            <!--修改按钮-->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            >编辑</el-button>
            <!--删除按钮-->
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页区域，@size-change在pageSize改变时会触发。 @current-change在currentPage 改变时会触发。:current-page：当前页数。:page-size每页显示条目个数。-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.queryInfo.papeNum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="this.queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!--添加仓库的对话框-->
    <el-dialog title="添加仓库" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!--内容主体区域-->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
        <el-form-item label="仓库名称" prop="whName" label-width="180px">
          <el-input v-model="addForm.whName"></el-input>
        </el-form-item>
        <el-form-item label="利润中心" prop="profitCenter" label-width="180px">
          <el-input v-model="addForm.profitCenter"></el-input>
        </el-form-item>
        <el-form-item label="仓库地址" prop="whAddress" label-width="180px">
          <el-input v-model="addForm.whAddress"></el-input>
        </el-form-item>
        <el-form-item label="仓库总容量" prop="whCapacity" label-width="180px">
          <el-input v-model="addForm.whCapacity"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="whRemarks" label-width="180px">
          <el-input v-model="addForm.whRemarks"></el-input>
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addWarehourse">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改仓库的对话框-->
    <el-dialog title="修改仓库" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <!--内容主体区域-->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef">
        <el-form-item label="仓库名称" prop="whName" label-width="180px">
          <el-input v-model="editForm.whName"></el-input>
        </el-form-item>
        <el-form-item label="利润中心" prop="profitCenter" label-width="180px">
          <el-input v-model="editForm.profitCenter"></el-input>
        </el-form-item>
        <el-form-item label="仓库地址" prop="whAddress" label-width="180px">
          <el-input v-model="editForm.whAddress"></el-input>
        </el-form-item>
        <el-form-item label="仓库总容量" prop="whCapacity" label-width="180px">
          <el-input v-model="editForm.whCapacity"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="whRemarks" label-width="180px">
          <el-input v-model="editForm.whRemarks"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editWarehourseInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //查询仓库数据的参数对象
      queryInfo: {
        papeNum: 1, //当前页数
        pageSize: 10, //当前每页显示条目个数
        query: {
          whName: '',
          profitCenter: '',
          whAddress: '',
        },
      },
      warehouselist: [],
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      //添加仓库数据
      addForm: {
        whName: '',
        profitCenter: '',
        whAddress: '',
        whCapacity: '',
        whRemarks: '',
      },
      //添加仓库表单的验证规则对象
      addFormRules: {
        whName: [
          { required: true, message: '请输入仓库名称', trigger: 'blur' },
        ],
        profitCenter: [
          { required: true, message: '请输入利润中心', trigger: 'blur' },
        ],
      },
      // 查询到的仓库信息对象
      editForm: {
        id: '',
        whName: '',
        profitCenter: '',
        whAddress: '',
        whCapacity: '',
        whRemarks: '',
      },
      // 编辑仓库表单的验证规则对象
      editFormRules: {
        whName: [
          { required: true, message: '请输入仓库名称', trigger: 'blur' },
        ],
        profitCenter: [
          { required: true, message: '请输入利润中心', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.getWarehourseList();
  },
  methods: {
    // 获取仓库列表
    getWarehourseList() {
      this.$http
        .get('/warehouse/list', {
          params: {
            papeNum: this.queryInfo.papeNum,
            pageSize: this.queryInfo.pageSize,
            whName: this.queryInfo.query.whName,
            profitCenter: this.queryInfo.query.profitCenter,
            whAddress: this.queryInfo.query.whAddress,
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.warehouselist = res.data.data.list;
            this.total = res.data.data.total;
          } else {
            this.$message.error('获取数据失败!');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //pageSize 改变时会触发
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getWarehourseList();
    },
    //currentPage 改变时会触发
    handleCurrentChange(newPage) {
      this.queryInfo.papeNum = newPage;
      this.getWarehourseList();
    },
    // 监听switch开关状态的改变
    stateChange(warehouserInfo) {
      var params = new URLSearchParams();
      params.append('id', warehouserInfo.id);
      params.append('whStatus', warehouserInfo.whStatus);
      this.$http
        .post('/warehouse/updateStatus', params)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success('更新数据状态成功');
          } else {
            warehouserInfo.whStatus = !warehouserInfo.whStatus;
            this.$message.error('更新数据状态失败!');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //监听添加仓库对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields(); // 表单的重置 也可以重置验证规则
    },
    // 点击按钮发送请求添加仓库
    addWarehourse() {
      //表单预验证
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        // 发起添加仓库的网络请求
        this.$http
          .post('/warehouse/add', this.addForm)
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.success('添加数据成功');
              // 关闭对话框
              this.addDialogVisible = false;
              // 重新加载页面
              this.getWarehourseList();
            } else {
              this.$message.error('添加数据失败!');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    },
    // 展示编辑的对话框
    showEditDialog(id) {
      this.editDialogVisible = true;
      this.$http
        .get('/warehouse/selectById/' + id)
        .then((res) => {
          if (res.data.code == 200) {
            this.editForm = res.data.data;
          } else {
            this.$message.error('获取数据失败!');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 监听编辑仓库对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields(); // 表单的重置 也可以重置验证规则
    },
    // 发送编辑请求修改仓库
    editWarehourseInfo() {
      this.$refs.editFormRef.validate((valid) => {
        // 预验证表单
        if (!valid) return;
        // 发起修改仓库的网络请求
        this.$http
          .post('/warehouse/editById',this.editForm)
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.success('修改数据成功');
              // 关闭对话框
              this.addDialogVisible = false;
              // 重新加载页面
              this.getWarehourseList();
            } else {
              this.$message.error('修改数据失败!');
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
</style>
