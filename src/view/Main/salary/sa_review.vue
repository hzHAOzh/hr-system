<template>
  <div class="bg">
    <div class=" user_input">
      <el-row :gutter="20">
        <span class=" username " style="margin:0px 1vw 0vw 1.75vw">标准编号</span>
        <el-input v-model="Object_select.sID" placeholder="请输入标准编号" :prefix-icon="Search" />

        <span class=" username " style="margin:0px 1vw 0vw 1.75vw">标准名称</span>
        <el-input v-model="Object_select.sName" placeholder="请输入标准名称" :prefix-icon="Search" />

        <span class=" userlevel" style="margin: 0 1vw">审核人员</span>
        <el-select v-model="Object_select.sReviewUser" placeholder="请选择审核人员" size="large">
          <el-option v-for="item in U_options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-row>
    </div>
    <div style="text-align: left;margin-bottom: 3vh;">
      <span class="username " style="margin: 0 1vw">审核状态</span>
      <el-select v-model="Object_select.sState" placeholder="请选择状态" size="large">
        <el-option v-for="item in State_options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

      <el-button type="primary" style="margin-left: 2vw" :icon="Search" @click="handleQuery">搜索</el-button>
      <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" :border="true" :row-style="{ height: '50px' }">
      <el-table-column fixed prop="sName" label="标准名称" width="100" />
      <el-table-column prop="sID" label="标准编号" width="120" />
      <el-table-column fixed prop="sState" label="标准状态" width="120" align="center">
        <template #default="scope">
          <!-- //tag -->
          <el-tag type="success" v-if="scope.row.sState == 'success'">已复核</el-tag>
          <el-tag v-else-if="scope.row.sState == 'null'">未复核</el-tag>
          <el-tag type="warning" v-else="scope.row.sState == 'fall'">已驳回</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sBasic" label="基本工资" width="120" />
      <el-table-column prop="sTransport" label="交通补助" width="120" />
      <el-table-column prop="sLunch" label="午餐补助" width="120" />
      <el-table-column prop="sCommunicate" label="通讯补助" width="120" />
      <el-table-column prop="sPerson" label="养老保险" width="120" />
      <el-table-column prop="sMedical" label="医疗保险" width="120" />
      <el-table-column prop="sUnemployment" label="失业保险" width="120" />
      <el-table-column prop="sTotal" label="总额" width="120" />
      <el-table-column prop="recorderName" label="记录人员" width="120" />
      <el-table-column prop="sRecordDate" label="记录时间" width="120" />
      <el-table-column prop="reviewName" label="复核人员" width="120" />
      <el-table-column prop="sReviewDate" label="复核日期" width="120" />
      <el-table-column prop="sComments" label="备注" width="120" />
      <el-table-column fixed="right" label="操作" a align="center" width="160">
        <template #default="scope">
          <el-button link type="primary" :icon="Edit" @click="handleUpdate(scope.row)">审核处理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationBox">
      <el-pagination background layout="prev, pager, next" @current-change="handlehCurrentChange"
        :current-page="state.CurrentPage" :page-size="state.PageSize" :total="state.Total" />
    </div>
    <!-- 添加或修改的弹窗 -->
    <div class="dialog">
      <el-dialog :title="dialog_title" v-model="dialog_open">
        <el-row>
          <el-form ref="ruleFormRef" :model="Object_add" :rules="rules" label-width="100px">
            <el-col :span="24">
              <el-form-item label="标准名称" prop="sName">
                <el-input disabled v-model="Object_add.sName" placeholder="请输入标准名称" clearable
                  :style="{ width: '100%' }">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="基本工资" prop="sBasic">
                <el-input disabled v-model="Object_add.sBasic" placeholder="请输入基本工资" show-word-limit clearable
                  :prefix-icon=Money @change="BasicChange" :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-row>
              <el-col :span="12">
                <el-form-item label="交通补助" prop="sTransport">
                  <el-input disabled v-model="Object_add.sTransport" placeholder="请输入交通补助" clearable :prefix-icon=Money
                    @change="BasicChange" :style="{ width: '100%' }"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="午餐补助" prop="sLunch">
                  <el-input disabled v-model="Object_add.sLunch" placeholder="请输入午餐补助" clearable :prefix-icon=Money
                    @change="BasicChange" :style="{ width: '100%' }"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="通讯补助" prop="sCommunicate">
                  <el-input disabled v-model="Object_add.sCommunicate" placeholder="请输入通讯补助" clearable
                    :prefix-icon=Money @change="BasicChange" :style="{ width: '100%' }"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="养老保险" prop="sPerson">
                  <el-input v-model="Object_add.sPerson" placeholder="请输入养老保险" clearable :prefix-icon=Money
                    :style="{ width: '100%' }" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="医疗保险" prop="sMedical">
                  <el-input v-model="Object_add.sMedical" placeholder="请输入医疗保险" clearable :prefix-icon=Money
                    :style="{ width: '100%' }" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="失业保险" prop="sUnemployment">
                  <el-input v-model="Object_add.sUnemployment" placeholder="请输入失业保险" clearable disabled
                    :prefix-icon=Money :style="{ width: '100%' }"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-col :span="24">
              <el-form-item label="总金额" prop="sTotal">
                <el-input v-model="Object_add.sTotal" placeholder="请输入总金额" :disabled='true' :prefix-icon=Money
                  :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-row>
              <el-col :span="12">
                <el-form-item label="记录人员" prop="sRecorder">
                  <el-select disabled v-model="Object_add.sRecorder" placeholder="请选择记录人员" clearable
                    :style="{ width: '100%' }">
                    <el-option v-for="(item, index) in U_options" :key="index" :label="item.label"
                      :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="记录时间" prop="sRecordDate">
                  <el-date-picker disabled v-model="Object_add.sRecordDate" :style="{ width: '100%' }"
                    placeholder="请输入记录时间" clearable></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="复核人员" prop="sRecorder">
                  <el-select v-model="Object_add.sReviewUser" placeholder="请选择复核人员" clearable
                    :style="{ width: '100%' }">
                    <el-option v-for="(item, index) in U_options" :key="index" :label="item.label"
                      :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="复核时间" prop="sRecordDate">

                  <el-date-picker v-model="Object_add.sReviewDate" format="YYYY/MM/DD" value-format="YYYY-MM-DD"
                    type="date" placeholder="Select date" />
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
            <el-button type="primary" @click="submitForm('success')">审核通过</el-button>
            <el-button type="danger" @click="submitForm('fall')">驳回审核</el-button>
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
import { Add, Update, Delete, GetAll, GetState, GetAllUser } from '../../../api/Salary'
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
  sState: '',
  sReviewUser: null
})
const sRecorderOptions = ref([{
  "label": "选项一",
  "value": 1
}, {
  "label": "选项二",
  "value": 2
}])
const dialog_title = ref("");
const dialog_open = ref(false);
const Object_add = reactive({
  sID: null,
  sName: '',
  sState: 'null',
  sBasic: null,
  sTransport: undefined,
  sLunch: undefined,
  sCommunicate: undefined,
  sPerson: undefined,
  sMedical: undefined,
  sUnemployment: undefined,
  sTotal: null,
  sRecorder: null,
  sRecordDate: '2022-12-14',
  sReviewUser: 1,
  sReviewDate: '2022-12-14',
  sComments: '',
})
const rules = reactive({
  sName: [{
    required: true,
    message: '请输入标准名称',
    trigger: 'blur'
  }],
  sBasic: [{
    required: true,
    message: '请输入基本工资',
    trigger: 'blur'
  }, {
    pattern: /^\d+(?=\.{0,1}\d+$|$)/,
    message: '只能输入数字',
    trigger: 'blur'
  }],
  sTransport: [{
    required: true,
    message: '请输入交通补助',
    trigger: 'blur'
  }, {
    pattern: /^\d+(?=\.{0,1}\d+$|$)/,
    message: '只能输入数字',
    trigger: 'blur'
  }],
  sLunch: [{
    required: true,
    message: '请输入午餐补助',
    trigger: 'blur'
  }, {
    pattern: /^\d+(?=\.{0,1}\d+$|$)/,
    message: '只能输入数字',
    trigger: 'blur'
  }],
  sCommunicate: [{
    required: true,
    message: '请输入通讯补助',
    trigger: 'blur'
  }, {
    pattern: /^\d+(?=\.{0,1}\d+$|$)/,
    message: '只能输入数字',
    trigger: 'blur'
  }],
  sPerson: [{
    required: true,
    message: '请输入养老保险',
    trigger: 'blur'
  }],
  sMedical: [{
    required: true,
    message: '请输入医疗保险',
    trigger: 'blur'
  }],
  sUnemployment: [{
    required: true,
    message: '请输入失业保险',
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

onMounted(async () => {
  await getList()

  getOptions()
})

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
  GetState(Object_select).then((res: any) => {
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
  Object_select.sReviewUser = null
  Object_select.sState = ''
  getList();

}
/** 取消按钮 */
function cancel() {
  dialog_open.value = false;
  resetQuery();
}
/** 提交按钮 */
function submitForm(value: any) {
  console.log("123");
  console.log("submit!!", Object_add);
  Object_add.sState = value;
  Update(Object_add).then((res: any) => {
    if (res.msg == "修改成功") {
      console.log(res);
      dialog_open.value = false;
      ElNotification({
        title: '审核处理成功',
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
// 编辑按钮操作
const handleUpdate = (row: any) => {
  console.log(row)
  dialog_title.value = "审核处理";
  dialog_open.value = true;
  Object_add.sID = row.sID;
  Object_add.sName = row.sName;
  Object_add.sBasic = row.sBasic;
  Object_add.sTransport = row.sTransport;
  Object_add.sLunch = row.sLunch;
  Object_add.sCommunicate = row.sCommunicate;
  Object_add.sPerson = row.sPerson;
  Object_add.sMedical = row.sMedical;
  Object_add.sUnemployment = row.sUnemployment;
  Object_add.sTotal = row.sTotal;
  Object_add.sRecorder = row.sRecorder;
  Object_add.sRecordDate = row.sRecordDate;
  Object_add.sReviewUser = row.sReviewUser;
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
// 计算保险值
function BasicChange() {
  Object_add.sPerson = (parseInt(Object_add.sBasic) * 0.08).toString();
  Object_add.sMedical = (parseInt(Object_add.sBasic) * 0.02 + 3).toString();
  Object_add.sUnemployment = (parseInt(Object_add.sBasic) * 0.05).toString();
  Object_add.sTotal = (parseInt(Object_add.sBasic) + parseInt(Object_add.sCommunicate) + parseInt(Object_add.sLunch) + parseInt(Object_add.sTransport) + parseInt(Object_add.sMedical) + parseInt(Object_add.sPerson) + parseInt(Object_add.sUnemployment)).toString()
}
// 获得选项栏的内容
const State_options = ref([{
  value: 'null',
  label: '待审核',
}, {
  value: 'success',
  label: '已审核',
}, {
  value: 'fall',
  label: '已驳回',
},]);
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
  margin-top: 3vh;
}
</style>