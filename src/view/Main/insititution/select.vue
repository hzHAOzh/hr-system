<template>
  <div class="bg">
    <div class="institution_input">
      <el-row :gutter="20">
        <span class="ml-3 w-35 text-gray-600 jigouname " style="margin: 0 1vw">机构ID</span>
        <el-input v-model="Object_select.iID" style="width:15vw" placeholder="请输入机构ID" :prefix-icon="Search" />
        <span class="ml-3 w-35 text-gray-600 jigouname " style="margin: 0 1vw">机构名称</span>
        <el-input v-model="Object_select.iName" style="width:15vw" placeholder="请输入机构名称" :prefix-icon="Search" />
        <span class="ml-3 w-35 text-gray-600 jigoulevel" style="margin: 0 1vw;">机构等级</span>
        <el-select v-model="Object_select.iLevel" placeholder="请选择机构等级" size="large">
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
      <el-button type="info" plain :icon="Sort" @click="toggleExpandAll">展开/折叠</el-button>
    </div>
    <el-table v-if="refreshTable" :default-expand-all="isExpandAll" :data="tableData" row-key="iID" style="width: 100%"
      :row-style="{ height: '50px' }" :tree-props="{ children: 'children' }">
      <el-table-column prop="iName" label="机构名称" width="260">
      </el-table-column>
      <el-table-column prop="iID" label="机构编号" width="240">

      </el-table-column>
      <el-table-column prop="iLevel" label="等级" width="260">
        <template #default="scope">
          <!-- //tag -->
          <el-tag v-if="(scope.row.iLevel == 1)">1级结构</el-tag>
          <el-tag v-else-if="(scope.row.iLevel == 2)" type="success">2级结构</el-tag>
          <el-tag v-else type="warning">3级结构</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="头部机构" align-items="center" prop="iParentsName" width="200">
      </el-table-column>
      <el-table-column label="Operations" width="220">
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
          <el-col :span="24">
            <el-form-item label="上级部门" prop="iParents">
              <el-tree-select clearable class="treeselect" v-model="Object_add.iParents" :data="tableData"
                :props="{ value: 'iID', label: 'iName', children: 'children' }" value-key="iID" placeholder="选择上级部门"
                check-strictly size="large" @node-click="handleNodeClick" @clear="set1Level" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="部门名称" prop="iName">
              <el-input v-model="Object_add.iName" placeholder="请输入部门名称" size="large" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门等级" prop="iLevel">

              <!-- //tag -->
              <el-tag v-if="(Object_add.iLevel == 1)">1级结构</el-tag>
              <el-tag v-else-if="(Object_add.iLevel == 2)" type="success">2级结构</el-tag>
              <el-tag v-else type="warning">3级结构</el-tag>
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
import { ref, nextTick, reactive, onMounted } from 'vue'

import { Timer } from '@element-plus/icons-vue'
import { Search, Refresh, Plus, Sort } from '@element-plus/icons-vue';
import { getAllInstitution, Add, Update, Delete } from '../../../api/Institution'
import { log } from 'console';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { FormInstance } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const Object_select = reactive({
  iID: '',
  iName: '',
  iParents: null,
  iLevel: ''
})
interface Institution {
  iID: number
  iName: string
  iLevel: number
  iParents: number
  iParentsName:String
  hasChildren?: boolean
  children?: Institution[]
}
const isExpandAll = ref(true);
const refreshTable = ref(true);

const tableData = ref([]);
onMounted(() => {
  getList()
})


/** 展开/折叠操作 */
async function toggleExpandAll() {
  refreshTable.value = false;
  isExpandAll.value = !isExpandAll.value;
  await nextTick(() => {
    refreshTable.value = true;
  });
}
/** 搜索按钮操作 */
async function handleQuery() {
  await getList()
  console.log(Object_select, tableData.value);
  console.log(rebuildData(Object_select, tableData.value));
  tableData.value = rebuildData(Object_select, tableData.value)
}
// 树状结构数据的搜索功能的实现
function rebuildData(value: any, arr: any) {
  if (!arr) {
    console.log("赋空了");
    return []
  }
  const newarr: any = [];
  arr.forEach((element: any) => {
    // indexOf用来判读当前节点name字段是否包含所搜索的字符串value
    // 返回值：包含则返回索引值，反之返回-1\
    if (element.iName.indexOf(value.iName) > -1 && (element.iID.toString() as string).search(value.iID) > -1 && (element.iLevel.toString() as string).search(value.iLevel) > -1) {
      // if (element.iID.toString().indexOf(value.iID) > -1) {
      const ab = rebuildData(value, element.children);
      const obj = {
        ...element,
        children: ab
      }
      newarr.push(obj);
    } else {
      // 判断当前节点知否有子节点，并且子节点中有数据，有数据继续递归查找
      if (element.children && element.children.length > 0) {
        const ab = rebuildData(value, element.children) as any;
        const obj = {
          ...element,
          children: ab
        };
        if (ab && ab.length > 0) {
          newarr.push(obj);
        }
      }
    }
  });
  return newarr
}

/** 重置按钮操作 */
function resetQuery() {
  Object_select.iID = '',
    Object_select.iName = '',
    Object_select.iLevel = '',
    getList();
}
/** 获取全部部门列表 */
async function getList() {
  await getAllInstitution().then((res: any) => {
    console.log(res);
    tableData.value = res.data;
    console.log('表格数据', tableData.value);

    // 为每个节点设置 iParentsName 值
    setParentsName(tableData.value, null);
  });
}

// 递归设置 iParentsName 值
function setParentsName(data: Institution[], parentName: string | null) {
  for (const item of data) {
    item.iParentsName = parentName; // 设置当前节点的 iParentsName 值
    if (item.children && item.children.length > 0) {
      // 递归处理子节点
      setParentsName(item.children, item.iName);
    }
  }
}


// 新增按钮
const dialog_title = ref("");
const dialog_open = ref(false);
const Object_add = reactive({
  iID: null,
  iParents: null,
  iName: '',
  iLevel: 1
})


const rules = reactive({
  iParents: [{ required: true, message: "上级部门不能为空", trigger: "blur" }],
  iName: [{ required: true, message: "部门名称不能为空", trigger: "blur" }],
  iLevel: [{ required: true, message: "部门等级不能为空", trigger: "blur" }],
})

/** 新增按钮操作 */
function handleAdd() {
  Object_add.iParents = null,
    Object_add.iName = '',
    Object_add.iLevel = 1,
    dialog_open.value = true;
  dialog_title.value = "添加部门";
}

/** 提交按钮 */
function submitForm(formEl: FormInstance | undefined) {

  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!!", Object_add);
      if (dialog_title.value == "添加部门") {
        Add(Object_add).then((res: any) => {
          console.log(res);
          if (res.msg == "添加成功") {
            dialog_open.value = false;
            getList()
            ElMessage({
              type: 'success',
              message: '添加成功',
            })
          }
          else {
            ElMessage({
              type: 'warning',
              message: '添加失败',
            })
          }
        })
      }
      else {
        Update(Object_add).then((res: any) => {
          console.log(res);
          if (res.msg == "修改成功") {
            dialog_open.value = false;
            getList()
            ElMessage({
              type: 'success',
              message: '修改成功',
            })
          }
          else {
            ElMessage({
              type: 'warning',
              message: '修改失败',
            })
          }
        })
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}

/** 取消按钮 */
function cancel() {
  dialog_open.value = false;
  resetQuery();
}

// 树节点点击事件
const handleNodeClick = async (data: any) => {
  console.log(Object_add.iParents)
  if (data.iLevel == 1) {
    console.log("AS", Object_add.iLevel);
    Object_add.iLevel = 2
  } else if (data.iLevel == 2) {
    console.log("AS", Object_add.iLevel);
    Object_add.iLevel = 3
  } else {
    ElMessage.error('无法选择 3级机构 为 上级部门')
    await nextTick(() => {
      Object_add.iParents = null
    })
    Object_add.iLevel = 1
  }
}

// 清空设置级别为一级机构
const set1Level = () => {
  Object_add.iLevel = 1
}
// 修改按钮
const handleEdit = (index: number, row: any) => {
  console.log(index, row)
  dialog_title.value = "修改部门";
  dialog_open.value = true;
  Object_add.iID = row.iID;
  Object_add.iName = row.iName;
  Object_add.iParents = row.iParents;
  Object_add.iLevel = row.iLevel;
}
// 删除按钮
const handleDelete = (index: number, row: Institution) => {
  console.log(index, row)
  ElMessageBox.confirm(
    '删除机构将删除同时其子级机构，您确定要这么做吗？',
    'error',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error',
    }
  )
    .then(() => {
      Delete(row.iID).then((res: any) => {
        console.log(res);
        if (res.msg == "删除成功") {
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
          getList()
        }
        else {
          ElMessage({
            type: 'warning',
            message: '删除失败',
          })
        }
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
    value: 1,
    label: '1级机构',
  },
  {
    value: 2,
    label: '2级机构',
  },
  {
    value: 3,
    label: '3级机构',
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
</style>