<template>
  <div class="bg">
    <div class=" user_input">
      <el-row :gutter="20">
        <span class=" username " style="margin:0px 1vw 0vw 1.75vw">标准编号</span>
        <el-input v-model="Object_select.sID" placeholder="请输入标准编号" :prefix-icon="Search" />

        <span class=" username " style="margin:0px 1vw 0vw 1.75vw">标准名称</span>
        <el-input v-model="Object_select.sName" placeholder="请输入标准名称" :prefix-icon="Search" />

        <span class=" userlevel" style="margin: 0 1vw">记录人员</span>
        <el-select v-model="Object_select.sRecorder" placeholder="请选择记录人员" size="large">
          <el-option v-for="item in U_options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-row>
    </div>
    <div style="text-align: left;margin-bottom: 3vh;">
      <span class="username " style="margin: 0 1vw">搜索金额</span>
      <el-input size="large" v-model="Object_select.sMoney" placeholder="请输入金额" :prefix-icon="Search" />

      <el-button type="primary" style="margin-left: 2vw" :icon="Search" @click="handleQuery">搜索</el-button>
      <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
      <el-button type="primary" plain :icon="Plus" @click="handleAdd">新增薪酬标准</el-button>
      <el-button type="primary" plain :icon="Plus" @click="handleAdd1">薪酬项目</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" :border="true" :row-style="{ height: '50px' }">
      <el-table-column fixed prop="sName" label="标准名称" width="150" />
      <el-table-column prop="sID" label="标准编号" width="120" />
      <el-table-column prop="sState" label="标准状态" width="120" align="center">
        <template #default="scope">
          <!-- //tag -->
          <el-tag type="success" v-if="scope.row.sState == 'success'">已复核</el-tag>
          <el-tag v-else-if="scope.row.sState == 'null'">未复核</el-tag>
          <el-tag type="warning" v-else="scope.row.sState == 'fall'">已驳回</el-tag>
        </template>
      </el-table-column>
      <el-table-column v-for="item in tableData1" :key="item.itID" :prop="'sItem_' + item.itID" :label="item.itName" width="120">
      <template #default="scope">
        <el-tag>{{ scope.row['sItem_' + item.itID] }}</el-tag>
      </template>
    </el-table-column>
      <el-table-column prop="recorderName" label="记录人员" width="120" />
      <el-table-column prop="sRecordDate" label="记录时间" width="120" />
      <el-table-column prop="sComments" label="备注" width="120" />
      <el-table-column fixed="right" label="操作" a align="center" width="160">
        <template #default="scope">
          <el-button link type="primary" :icon="Edit" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button link type="primary" :icon="CloseBold" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationBox">
      <el-pagination background layout="prev, pager, next" @current-change="handlehCurrentChange"
        :current-page="state.CurrentPage" :page-size="state.PageSize" :total="state.Total" />
    </div>
    <!-- 添加薪酬项目的弹窗 -->
    <div class="dialog">
      <el-dialog :title="dialog_title1" v-model="dialog_open1">
        <el-row>
          <el-form ref="ruleFormRef" :model="Object_add1" :rules="rules1" label-width="100px">
          <el-col :span="24">
              <el-form-item label="新增项目" prop="itName">
                <el-input v-model="Object_add1.itName" placeholder="请输入项目名称" clearable :style="{ width: '100%' }">
                </el-input>
              </el-form-item>
            </el-col>
          </el-form>
          <el-col :span="24">
        <el-form-item label="已添加项目">
          <el-select v-model="Object_add1.itID" placeholder="请选择已添加的项目" clearable :style="{ width: '100%' }" :options="Object_add1.itOptions">
            <el-option v-for="item in tableData1" :key="item.itID" :label="item.itName" :value="item.itID" />
          </el-select>
        </el-form-item>
      </el-col>
        </el-row>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="submitForm1(ruleFormRef)">确 定</el-button>
            <el-button @click="deleteSelectedItem"  type="primary">删除</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <!-- 添加或修改的弹窗 -->
    <div class="dialog">
      <el-dialog :title="dialog_title" v-model="dialog_open">
        <el-row>
          <el-form ref="ruleFormRef" :model="Object_add" :rules="rules" label-width="100px">
            <el-col :span="24">
              <el-form-item label="标准名称" prop="sName">
                <el-input v-model="Object_add.sName" placeholder="请输入标准名称" clearable :style="{ width: '100%' }">
                </el-input>
              </el-form-item>
              <el-col :span="24">
        <el-form-item label="薪酬项目" prop="sItems">
          <!-- 显示所有项目并使用复选框 -->
          <el-checkbox-group v-model="Object_add.sItems">
            <el-checkbox v-for="item in tableData1" :key="item.itID" :label="item.itID">{{ item.itName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
      
      <!-- 根据选择的项目动态显示对应的输入框 -->
      <el-col :span="24" v-for="itemID in Object_add.sItems" :key="itemID">
        <el-form-item :label="'输入值 - ' + itemID" :prop="'sItemValue_' + itemID">
          <el-input v-model="Object_add.dynamicInputs[itemID]" placeholder="请输入金额" clearable :style="{ width: '100%' }"></el-input>
        </el-form-item>
      </el-col>
            </el-col>
            <el-row>
              <el-col :span="12">
                <el-form-item label="记录人员" prop="sRecorder">
                  <el-select v-model="Object_add.sRecorder" placeholder="请选择记录人员" clearable :style="{ width: '100%' }">
                    <el-option v-for="(item, index) in U_options" :key="index" :label="item.label"
                      :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="记录时间" prop="sRecordDate">
                  <el-date-picker v-model="Object_add.sRecordDate" format="YYYY/MM/DD" value-format="YYYY-MM-DD"
                    type="date" placeholder="请输入记录时间" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-col :span="24">
              <el-form-item label="备注" prop="sComments">
                <el-input v-model="Object_add.sComments" type="textarea" placeholder="请输入备注"
                  :autosize="{ minRows: 4, maxRows: 4 }" :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="submitForm(ruleFormRef)">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { Search, Refresh, Plus, Edit, CloseBold, Money } from '@element-plus/icons-vue'
import { Add, Update, Delete, GetAll, Get, GetAllUser } from '../../../api/Salary'
import { AddItem, UpdateItem, DeleteItem, GetAllItem} from '../../../api/item'
import { AddItAndSa, UpdateItAndSa, DeleteItAndSa, GetAllItAndSa} from '../../../api/itandsa'
import type { FormInstance } from 'element-plus'
import { ElNotification, ElMessageBox } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
//状态
const input1 = ref('')
const isExpandAll = ref(true);
const refreshTable = ref(true);
const Object_select = reactive({
  sID: null,
  sName: '',
  sMoney: '',
  sRecorder: ''
})
const sRecorderOptions = ref([{
  "label": "选项一",
  "value": 1
}, {
  "label": "选项二",
  "value": 2
}])
const dialog_title1 = ref("");
const dialog_open1 = ref(false);
const Object_add1 = reactive({
  itID: null,
  itName:'',
  itOptions: []
})
const Object_add2 = reactive({
  sID:null,
  itID: null,
  itName:null,
  money:''
})
const dialog_title = ref("");
const dialog_open = ref(false);
const Object_add = reactive({
  sID: null,
  sName: '',
  sState: 'null',
  sTotal: null,
  sRecorder: null,
  sRecordDate: '0000-00-00',
  sReviewUser: 1,
  sReviewDate: '0000-00-00',
  sComments: '',
  sItems: [] as number[], 
  dynamicInputs: {} as Record<string, string>,
})
const rules2 = reactive({
  money: [
    {
      required: true,
      message: '请输入金额',
      trigger: 'blur',
    },
  ],
});
const rules1 = reactive({
  itName: [
    {
      required: true,
      message: '请输入项目名称',
      trigger: 'blur',
    },
  ],
});
const rules = reactive({
  sName: [{
    required: true,
    message: '请输入标准名称',
    trigger: 'blur'
  }],
  sTotal: [{
    required: true,
    message: '请输入总金额',
    trigger: 'blur'
  }],
  sRecorder: [{
    required: true,
    message: '请选择记录人员',
    trigger: 'change'
  }],
  sRecordDate: [{
    required: true,
    message: '请输入记录时间',
    trigger: 'change'
  }],
  sComments: [],
})
const tableData = ref([]);
const tableData1 = ref([]);
onMounted(async () => {
  await getList()
  getOptions()
})

//获得全部item
async function getList1() {
  await GetAllItem().then((res: any) => {
    console.log(res.data);

    tableData1.value = res.data
    queryTableData1()
  })
}

// 获得全部
async function getList() {
  await GetAll().then((res: any) => {
    console.log(res.data);

    tableData.value = res.data
    queryTableData()
  })
}

/** 搜索按钮操作 */
async function handleQuery() {
  await getList();
  Get(Object_select).then((res: any) => {
    console.log(Object_select);
    tableData.value = res.data
    console.log('表格数据', tableData.value);
    queryTableData()
  })
}

/** 重置按钮操作 */
function resetQuery() {
  Object_select.sID = null
  Object_select.sName = ''
  Object_select.sRecorder = ''
  Object_select.sMoney = ''
  getList();

}


/** 提交项目按钮 */
function submitForm1(formE: FormInstance | undefined) {
  console.log("123");
  if (!formE) return
  formE.validate((valid) => {
    if (valid) {
      console.log("submit!!", Object_add1);
      if (dialog_title1.value == "添加项目") {
        AddItem(Object_add1).then((res: any) => {
          if (res.msg == "添加成功") {
            const sID = res.data.sID;
            addItAndSaEntries(sID, Object_add.sItems);
            dialog_open1.value = false;
            ElNotification({
              title: '添加成功',
              message: '正在刷新列表',
              type: 'success',
            })
            getList1()
          }
          else {
            ElNotification({
              title: res.msg,
              message: '正在刷新列表',
              type: 'error',
            })
          }
        })
      }
      else {
        UpdateItem(Object_add1).then((res: any) => {
          if (res.msg == "修改成功") {
            console.log(res);
            dialog_open1.value = false;
            ElNotification({
              title: '修改成功',
              message: '正在刷新列表',
              type: 'success',
            })
            getList1()
          }
          else {
            ElNotification({
              title: res.msg,
              message: '正在刷新列表',
              type: 'error',
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
  dialog_open1.value = false;
  resetQuery();
}
/** 提交按钮 */
function submitForm(formEl: FormInstance | undefined) {
  console.log("123");
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!!", Object_add);
      if (dialog_title.value == "添加标准") {
        Add(Object_add).then((res: any) => {
          if (res.msg == "添加成功") {
            console.log(res);
            dialog_open.value = false;
            ElNotification({
              title: '添加成功',
              message: '正在刷新列表',
              type: 'success',
            })
            getList()
            const sID = res.data.sID;
            
            // 获取选中的项目
            const selectedItems = Object_add.sItems;
            
            // 添加到 ItAndSa 表
            addItAndSaEntries(sID, selectedItems);
          }
          else {
            ElNotification({
              title: res.msg,
              message: '正在刷新列表',
              type: 'error',
            })
          }
        })
      }
      else {
        Update(Object_add).then((res: any) => {
          if (res.msg == "修改成功") {
            console.log(res);
            dialog_open.value = false;
            ElNotification({
              title: '修改成功',
              message: '正在刷新列表',
              type: 'success',
            })
            getList()
          }
          else {
            ElNotification({
              title: res.msg,
              message: '正在刷新列表',
              type: 'error',
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
// 添加到 ItAndSa 表
function addItAndSaEntries(sID: any, selectedItems: number[]) {
  selectedItems.forEach((itID: number) => {
    const itName = tableData1.value.find((item: any) => item.itID === itID)?.itName || '';
    const inputKey = 'sItemValue_' + itID;
    const inputValue = Object_add.dynamicInputs[inputKey] || '';
    console.log("sID before AddItAndSa:", sID);
    console.log("itName before AddItAndSa:", itName);
    
    const validSID = sID || 1;
    // 调用 API 添加 ItAndSa 条目
    AddItAndSa({
      sID: validSID,
      itID: itID,
      itName: itName,
      money: inputValue,
      dynamicInputs: '',
    }).then((saRes: any) => {
      if (saRes.msg == "添加成功") {
        ElNotification({
          title: '添加成功',
          message: '正在刷新列表',
          type: 'success',
        });
        // 可根据需要刷新列表
      } else {
        ElNotification({
          title: saRes.msg,
          message: '正在刷新列表',
          type: 'error',
        });
      }
    });
  });
}
/** 新增薪酬项目按钮操作 */
function handleAdd1() {
  Object_add1.itName = '',
    dialog_open1.value = true;
  dialog_title1.value = "添加项目";
  getList1();
}
/** 新增按钮操作 */
function handleAdd() {
  Object_add.sName = '',
    Object_add.sTotal = '0',
    Object_add.sRecorder = null,
    Object_add.sRecordDate = '',
    Object_add.sComments = '',
    Object_add.sItems.forEach((itID) => {
    const inputKey = 'sItemValue_' + itID;
    Object_add.dynamicInputs[inputKey] = ''; // 初始化dynamicInputs属性
  });
  tableData1.value.forEach((item) => {
    const inputKey = 'sItemValue_' + item.itID;
    if (!(inputKey in Object_add.dynamicInputs)) {
      Object_add.dynamicInputs[inputKey] = '';
    }
  });
    dialog_open.value = true;
  dialog_title.value = "添加标准";
}
// 编辑按钮操作
const handleUpdate = (row: any) => {
  console.log(row)
  dialog_title.value = "修改标准";
  dialog_open.value = true;
  Object_add.sID = row.sID;
  Object_add.sName = row.sName;
  Object_add.sTotal = row.sTotal;
  Object_add.sRecorder = row.sRecorder;
  Object_add.sRecordDate = row.sRecordDate;
  Object_add.sComments = row.sComments;
}
// 删除按钮操作
const handleDelete = (row: any) => {
  console.log(row)
  ElMessageBox.confirm(
    '删除将无法撤回，您确定要这么做吗？',
    'error',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error',
    }
  )
    .then(() => {
      Delete(row.sID).then((res: any) => {
        console.log(res);
        ElNotification({
          title: '删除成功',
          message: '正在刷新列表',
          type: 'success',
        })
        getList()
      })

    })
    .catch(() => {
      ElNotification({
        title: '删除取消',
        type: 'info',
      })
    })
}

// 获得选项栏的内容
const U_options = ref([{
  value: '三级机构',
  label: 1,
}]);
async function getOptions() {
  GetAllUser().then((res: any) => {
    U_options.value = [];
    res.data.forEach((item: any) => {
      U_options.value.push({
        value: item.uID,
        label: item.uName,
      })
    })
  })
}



// 分页效果
const state = reactive({
  CurrentPage: 1,
  PageSize: 10,
  Total: 0,
  TotalList: [],
});
// 新增删除项目方法
function deleteSelectedItem() {
  if (!Object_add1.itID) {
    ElNotification({
      title: '请选择要删除的项目',
      type: 'warning',
    });
    return;
  } ElMessageBox.confirm(
    '删除将无法撤回，您确定要删除选中的项目吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    DeleteItem(Object_add1.itID).then((res: any) => {
      if (res.msg === '删除成功') {
        ElNotification({
          title: '删除成功',
          type: 'success',
        });
        getList1();
        // 清除选中的项目
        Object_add1.itID = null;
      } else {
        ElNotification({
          title: res.msg,
          type: 'error',
        });
      }
    });
  });
}
//item分页
function queryTableData1() {
  console.log("分页");
  state.TotalList = tableData1.value; //TableDataJSON.tableData 表格数据
  state.CurrentPage = 1;
  state.Total = tableData1.value.length;
  if (tableData1.value.length > state.PageSize) {
    tableData1.value = state.TotalList.slice(
      0,
      state.PageSize
    );
  } else console.log("看看", tableData1.value);

}
// 分页
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

   // 更新已添加项目下拉框的选项
   updateSelectedItemOptions();
}
function updateSelectedItemOptions() {
  Object_add1.itID = null; // 清除选中的项目
  Object_add1.itOptions = tableData1.value.map((item) => ({
    value: item.itID,
    label: item.itName,
  }));
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

:deep(.el-table .cell) {
  white-space: nowrap; //防止换行
}

.bg :deep(.el-input) {
  width: 19vw !important;
}

.dialog :deep(.el-input) {
  width: 100% !important;
}

.dialog :deep(.el-form) {
  width: 100% !important;
}

.dialog {
  height: 100%;
}

.paginationBox {
  margin: 15px;
}

:deep(.el-pagination) {
  justify-content: center;
}

:deep(.el-dialog) {
  margin-top: 4vh;
}
</style>