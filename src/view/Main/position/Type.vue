<template>
  <div class="bg">
    <div class="PositionType_input">
      <el-row :gutter="20">
        <span class="ml-3 w-35 text-gray-600 jigouname " style="margin: 0 1vw">职称ID</span>
        <el-input v-model="Object_select.ptID" style="width:15vw" placeholder="请输入职称ID" :prefix-icon="Search" />
        <span class="ml-3 w-35 text-gray-600 jigouname " style="margin: 0 1vw">职称</span>
        <el-input v-model="Object_select.ptName" style="width:15vw" placeholder="请输入职称" :prefix-icon="Search" />
        <span class="ml-3 w-35 text-gray-600 jigoulevel" style="margin: 0 1vw;">权限选择</span>
        <el-select v-model="Object_select.ptRole" placeholder="请选择权限" size="large">
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
    <el-table :data="tableData" row-key="ptID" style="width: 100%" :row-style="{ height: '50px' }">
      <el-table-column prop="ptName" label="职称" width="250">
      </el-table-column>
      <el-table-column prop="ptID" label="职称编号" width="250">
      </el-table-column>
      <el-table-column prop="ptRole" label="等级" width="250">
        <template #default="scope">
          <!-- //tag -->
          <el-tag>{{ scope.row.ptRole }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sID" label="薪酬标准" width="250">
      </el-table-column>
      <el-table-column label="Operations" width="250">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加或修改部门对话框 -->
    <el-dialog :title="dialog_title" v-model="dialog_open" width="600px" append-to-body>
      <el-form ref="ruleFormRef" :model="Object_add" :rules="rules" label-width="80px">
        <el-row>


          <el-col :span="12">
            <el-form-item label="职称" prop="ptName">
              <el-input v-model="Object_add.ptName" placeholder="请输入职称" size="large" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职称权限" prop="ptRole">
              <el-select v-model="Object_add.ptRole" placeholder="请选择权限" size="large">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="12">
            <el-form-item label="薪酬标准" prop="sID">
              <el-select v-model="Object_add.sID" placeholder="请选择薪酬标准" size="large">
                <el-option v-for="item in S_options" :key="item.value" :label="item.label" :value="item.value" />
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
import { GetAllType} from "../../../api/employee";
import { Search, Refresh, Plus, Sort } from '@element-plus/icons-vue';
import { GetAll, Get, Add, Update, Delete } from '../../../api/PositionType'
import { ElMessage, ElMessageBox } from 'element-plus';
import type { FormInstance } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const Object_select = reactive({
  ptID: null,
  ptName: '',
  ptRole: ''
})
interface PositionType {
  ptID: number
  ptName: string
  ptRole: string
}

const tableData = ref([]);
onMounted(() => {
  getList()
})

const S_options = ref([{
  value:'三级机构',
  label:1,
}])

GetAllType().then((res: any) => {
  S_options.value = [];

  res.data.forEach((item: any) => {
    // 添加下面的逻辑以确保不添加重复项
    const alreadyExists = S_options.value.some((existingItem) => existingItem.value === item.sID);

    if (!alreadyExists) {
      S_options.value.push({
        value: item.sID,
        label: item.sName,
      });
    }
  });
});


/** 搜索按钮操作 */
async function handleQuery() {
  await Get(Object_select).then((res: any) => {
    console.log(res);
    tableData.value = res.data
    console.log('表格数据', tableData.value);
  })
}

/** 重置按钮操作 */
function resetQuery() {
  Object_select.ptID = null,
    Object_select.ptName = '',
    Object_select.ptRole = '',
    getList();
}
/** 获取全部部门列表 */
async function getList() {
  await GetAll().then((res: any) => {
    tableData.value = res.data
  })
}

// 新增按钮
const dialog_title = ref("");
const dialog_open = ref(false);
const Object_add = reactive({
  ptID: null,
  ptName: '',
  ptRole: '',
  sID:''
})


const rules = reactive({
  ptName: [{ required: true, message: "类别名称不能为空", trigger: "blur" }],
  ptRole: [{ required: true, message: "类别权限不能为空", trigger: "blur" }],
})

/** 新增按钮操作 */
function handleAdd() {
  Object_add.ptName = '',
    Object_add.ptRole = '',
    dialog_open.value = true;
  dialog_title.value = "添加类别";
}

/** 提交按钮 */
async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!!", Object_add);
      if (dialog_title.value == "添加类别") {
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
  Object_add.ptID = row.ptID;
  Object_add.ptName = row.ptName;
  Object_add.ptRole = row.ptRole;
  Object_add.sID = row.sID;
}

// 删除按钮
const handleDelete = (index: number, row: PositionType) => {
  console.log(index, row)
  ElMessageBox.confirm(
    '删除类别将无法撤回，您确定要这么做吗？',
    'error',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error',
    }
  )
    .then(() => {
      Delete(row.ptID).then((res: any) => {
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

const options = [
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
]
</script>
<style lang="less" scoped>
.jigouname,
.jigoulevel {
  height: 5vh;
  line-height: 5vh;
  font-weight: 700;
}

.PositionType_input {
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
</style>