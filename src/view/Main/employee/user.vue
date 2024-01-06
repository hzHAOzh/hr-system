<template>
  <div class="bg">
    <div class=" user_input">
      <el-row :gutter="20">

        <span class=" username " style="margin:0px 1vw 0vw 1.75vw">用户账号</span>
        <el-input v-model="Object_select.uName" placeholder="请输入用户账号" :prefix-icon="Search" />

        <span class=" username " style="margin: 0px 1vw 0vw 1.75vw">用户ID</span>
        <el-input v-model="Object_select.uID" placeholder="请输入用户ID" :prefix-icon="Search" />

        <span class=" username " style="margin: 0 1vw">用户职位</span>
        <el-select v-model="Object_select.pName" placeholder="请选择用户职位" size="large">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

      </el-row>

    </div>
    <div style="text-align: left;margin-bottom: 3vh;">
      <span class=" userlevel" style="margin: 0 1vw">用户状态</span>

      <el-select v-model="Object_select.uState" placeholder="请选择用户状态" size="large">
        <el-option v-for="item in options_state" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

      <el-button type="primary" style="margin-left: 2vw" :icon="Search" @click="handleQuery">搜索</el-button>
      <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
      <el-button type="primary" plain :icon="Plus" @click="handleAdd">新增</el-button>
    </div>
    <el-table :data="tableData" row-key="uID" style="width: 100%" :row-style="{ height: '50px' }">
      <el-table-column prop="uID" label="用户ID" width="200">
      </el-table-column>
      <el-table-column prop="uName" label="用户账号" width="200">

      </el-table-column>
      <el-table-column prop="pName" label="职位名称" width="200">
        <template #default="scope">
          <!-- //tag -->
          <el-tag>{{ scope.row.pName }}</el-tag>
        </template>
      </el-table-column>
      <!-- 状态栏 -->
      <el-table-column prop="uState" label="用户状态" width="200">
        <template #default="scope">
          <el-switch active-value="allow" inactive-value="reject" v-model="scope.row.uState" disabled
            @change="change(scope.row)" />
        </template>
      </el-table-column>

      <el-table-column label="职位权限" align-items="center" prop="ptRole" width="170">
      </el-table-column>
      <el-table-column label="Operations" width="215">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationBox">
      <el-pagination background layout="prev, pager, next" @current-change="handlehCurrentChange"
        :current-page="state.CurrentPage" :page-size="state.PageSize" :total="state.Total" />
    </div>
    <!-- 添加或修改部门对话框 -->
    <el-dialog :title="dialog_title" v-model="dialog_open" width="600px" append-to-body>
      <el-form ref="ruleFormRef" :model="Object_add" :rules="rules" label-width="80px">
        <el-row>

          <el-col :span="24">
            <el-form-item label="用户账号" prop="uName">
              <el-input v-model="Object_add.uName" placeholder="请输入用户账号" size="large" class="dialog" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="用户密码" prop="uPassword">
              <el-input v-model="Object_add.uPassword" placeholder="请输入用户密码" size="large" class="dialog"
                type="password" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位名称" prop="uPosition">
              <el-select v-model="Object_add.uPosition" placeholder="请选择职位名称" class="dialog" size="large">
                <el-option v-for="item in options_add" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户状态" prop="uState">
              <el-select v-model="Object_add.uState" placeholder="请选择状态" class="dialog" size="large">
                <el-option v-for="item in options_state" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm(ruleFormRef)">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>

</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { GetAll, GetAllType, Get, Add, Update, Delete } from '../../../api/User'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import type { FormInstance } from 'element-plus'
//状态
const ruleFormRef = ref<FormInstance>()

const Object_select = reactive({
  uID: null,
  uName: '',
  pName: '',
  uState: ''
})
interface User {
  uID: number,
  uName: string,
  pName: string,
  uState: string
}

const tableData = ref([]);
onMounted(async () => {
  await getList()
  await getTypeList()
})

/** 搜索按钮操作 */
async function handleQuery() {
  await Get(Object_select).then((res: any) => {
    console.log(Object_select);
    tableData.value = res.data
    console.log('表格数据', tableData.value);
    queryTableData()

  })
}

/** 重置按钮操作 */
function resetQuery() {
  Object_select.uID = null,
    Object_select.uName = '',
    Object_select.uState = '',
    Object_select.pName = '',
    getList();
}
/** 获取全部列表 */
async function getList() {
  await GetAll().then((res: any) => {
    tableData.value = res.data
    queryTableData()

  })
}

/** 获取全部类别列表 */
async function getTypeList() {
  await GetAllType().then((res: any) => {
    options.value = [];
    options_add.value = [];
    res.data.forEach((item: any) => {
      options.value.push({
        value: item.pName,
        label: item.pName,
      })
      options_add.value.push({
        value: item.pID,
        label: item.pName,
      })
    })
  })
}

// 新增按钮
const dialog_title = ref("");
const dialog_open = ref(false);
const Object_add = reactive({
  uID: null,
  uName: '',
  uPassword: '',
  uPosition: null,
  uState: '',
  uAvatar: '',
})

// 新增或修改的表格格式检查
const rules = reactive({
  uName: [{ required: true, message: "用户账号不能为空", trigger: "blur" }],
  uPassword: [{ required: true, message: "用户密码不能为空", trigger: "blur" }],
  uPosition: [{ required: true, message: "职位不能为空", trigger: "blur" }],
  uState: [{ required: true, message: "状态不能为空", trigger: "blur" }],
})

/** 新增按钮操作 */
function handleAdd() {
  Object_add.uName = '',
    Object_add.uPassword = '',
    Object_add.uPosition = null,
    Object_add.uState = '',
    dialog_open.value = true;
  dialog_title.value = "添加用户";
}

/** 提交按钮 */
async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!!", Object_add);
      if (dialog_title.value == "添加用户") {
        Add(Object_add).then((res: any) => {
          console.log(res);
          dialog_open.value = false;
          getList()
          ElMessage({
            type: 'success',
            message: '添加成功',
          })
        })
      }
      else {
        Update(Object_add).then((res: any) => {
          console.log(res);
          dialog_open.value = false;
          getList()
          ElMessage({
            type: 'success',
            message: '修改成功',
          })
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })


}

/** 取消按钮 */
function cancel() {
  dialog_open.value = false;
  resetQuery();
}

// 修改按钮
const handleEdit = (index: number, row: any) => {
  console.log(index, row)
  dialog_title.value = "修改";
  dialog_open.value = true;
  Object_add.uPassword = row.uPassword;
  Object_add.uName = row.uName;
  Object_add.uPosition = row.uPosition;
  Object_add.uState = row.uState;
  Object_add.uID = row.uID;
}
// 删除按钮
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
  ElMessageBox.confirm(
    '删除后将无法撤回，您确定要这么做吗？',
    'error',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error',
    }
  )
    .then(() => {
      Delete(row.uID).then((res: any) => {
        console.log(res);
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        getList()
      })

    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除取消',
      })
    })
}
const options_add = ref([{
  value: '组织管理员',
  label: 1,
}]);
const options = ref([
  {
    value: '组织管理员',
    label: '组织管理员',
  },
  {
    value: '超级管理员',
    label: '超级管理员',
  },
  {
    value: '薪酬管理员',
    label: '薪酬管理员',
  },
  {
    value: '员工管理员',
    label: '员工管理员',
  },
  {
    value: '普通用户',
    label: '普通用户',
  },
])
const options_state = [
  {
    value: 'allow',
    label: '允许登录',
  },
  {
    value: 'reject',
    label: '禁止登录',
  },
]
// Switch 按钮
function change(row: any) {
  console.log("switch!!!", row);
}

// 分页效果

const state = reactive({
  CurrentPage: 1,
  PageSize: 10,
  Total: 0,
  TotalList: [],
});
function queryTableData() {
  console.log("分页");
  state.TotalList = tableData.value; //TableDataJSON.tableData 表格数据
  state.CurrentPage = 1;
  state.Total = tableData.value.length;
  if (tableData.value.length > state.PageSize) {
    tableData.value = state.TotalList.slice(
      0,
      state.PageSize
    );
  } else console.log("看看", tableData.value);

}
function handlehCurrentChange(val: any) {
  console.log(val);
  state.CurrentPage = Math.ceil(val);
  const end = Math.ceil(val) * state.PageSize;
  const data = state.TotalList.slice(end - state.PageSize, end);
  console.log(data, 'data')
  tableData.value = data;
}
</script>
<style lang="less" scoped>
.username,
.userlevel {
  height: 5vh;
  line-height: 5vh;
  font-weight: 700;

}

.user_input {
  margin-bottom: 18px;
  display: flex;
  align-items: center;
}

:deep(.el-input__wrapper),
:deep(.el-input) {
  width: 19vw;
}

:deep(.dialog .el-input) {
  width: 12vw !important
}

:deep(.el-form-item__content .el-input) {
  width: 30vw;

}

.paginationBox {
  margin: 15px;
}

:deep(.el-pagination) {
  justify-content: center;
}
</style>