<template>
  <div class="bg">
    <div class="institution_input">
      <el-row :gutter="20">
        <span class="ml-3 w-35 text-gray-600 jigouname " style="margin: 0 1vw">职位ID</span>
        <el-input v-model="Object_select.pID" style="width:15vw" placeholder="请输入职位ID" :prefix-icon="Search" />
        <span class="ml-3 w-35 text-gray-600 jigouname " style="margin: 0 1vw">职位名称</span>
        <el-input v-model="Object_select.pName" style="width:15vw" placeholder="请输入职位名称" :prefix-icon="Search" />
        <span class="ml-3 w-35 text-gray-600 jigoulevel" style="margin: 0 1vw">职称选择</span>

        <el-select v-model="Object_select.ptName" placeholder="请选择类别" size="large">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-row>
      <div>
        <el-button type="primary" style="margin-left: 2vw" :icon="Search" @click="handleQuery">搜索</el-button>
        <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
      </div>


    </div>
    <div style="text-align: left;margin-bottom: 3vh;">
      <el-button type="primary" plain :icon="Plus" @click="handleAdd">新增</el-button>
    </div>
    <el-table :data="tableData" row-key="pID" style="width: 100%" :row-style="{ height: '50px' }"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="pName" label="职位名称" width="240">
      </el-table-column>
      <el-table-column prop="pID" label="职位ID" width="220">

      </el-table-column>
      <el-table-column prop="pType" label="职称" width="240">
        <template #default="scope">
          <!-- //tag -->
          <el-tag>{{ scope.row.ptName }}</el-tag>


        </template>
      </el-table-column>
      <el-table-column label="职位权限" align-items="center" prop="ptRole" width="240">
      </el-table-column>
      <el-table-column label="Operations" width="240">
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

          <el-col :span="12">
            <el-form-item label="职位名称" prop="ptName">
              <el-input v-model="Object_add.pName" placeholder="请输入职位名称" size="large" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职称" prop="ptRole">
              <el-select v-model="Object_add.pType" placeholder="请选择职称" size="large">
                <el-option v-for="item in options_add" :key="item.value" :label="item.label" :value="item.value" />
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
import { GetAll, GetAllType, Get, Add, Update, Delete } from '../../../api/Position'
import { Timer } from '@element-plus/icons-vue'
import { Search, Refresh, Plus, Sort } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import type { FormInstance } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const Object_select = reactive({
  pID: null,
  pName: '',
  ptName: '',
  ptRole: ''
})
interface Position {
  pID: number,
  pName: string,
  ptName: string
  ptRole: string
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
  Object_select.pID = null,
    Object_select.pName = '',
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
        value: item.ptName,
        label: item.ptName,
      })
      options_add.value.push({
        value: item.ptID,
        label: item.ptName,
      })
    })
  })
}

// 新增按钮
const dialog_title = ref("");
const dialog_open = ref(false);
const Object_add = reactive({
  pID: null,
  pName: '',
  pType: ''
})

// 新增或修改的表格格式检查
const rules = reactive({
  pName: [{ required: true, message: "职位名称不能为空", trigger: "blur" }],
  pType: [{ required: true, message: "职位类别不能为空", trigger: "blur" }],
})

/** 新增按钮操作 */
function handleAdd() {
  Object_add.pName = '',
    Object_add.pType = '',
    dialog_open.value = true;
  dialog_title.value = "添加职位";
}

/** 提交按钮 */
async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!!", Object_add);
      if (dialog_title.value == "添加职位") {
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
  Object_add.pID = row.pID;
  Object_add.pName = row.pName;
  Object_add.pType = row.pType;
}
// 删除按钮
const handleDelete = (index: number, row: Position) => {
  ElMessageBox.confirm(
    '删除职位将无法撤回，您确定要这么做吗？',
    'error',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error',
    }
  )
    .then(() => {
      Delete(row.pID).then((res: any) => {
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

// 分页效果

const state = reactive({
  CurrentPage: 1,
  PageSize: 10,
  Total: 0,
  TotalList: [],
});
// 分页
function queryTableData() {
  state.TotalList = tableData.value; //TableDataJSON.tableData 表格数据
  state.CurrentPage = 1;
  state.Total = tableData.value.length;
  console.log(state);
  if (tableData.value.length > state.PageSize) {
    tableData.value = state.TotalList.slice(
      0,
      state.PageSize
    );
  }
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
.jigouname,
.jigoulevel {
  height: 5vh;
  line-height: 5vh;
  font-weight: 700;

}

.institution_input {
  margin-bottom: 18px;
  display: flex;
  align-items: center;
}

:deep(.el-table th.el-table__cell) {
  background-color: #F8F8F9
}

:deep(.el-form-item__label) {
  font-weight: 700;
}

:deep(.el-form-item__content .el-select) {
  width: 100%;
}

.paginationBox {
  margin: 15px;
}

:deep(.el-pagination) {
  justify-content: center;
}
</style>