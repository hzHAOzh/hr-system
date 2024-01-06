<template>
  <div class="bg">
    <div class=" user_input">
      <el-row :gutter="20">
        <span class=" username " style="margin:0px 1vw 0vw 1.75vw">标准编号</span>
        <el-input v-model="Object_select.sID" placeholder="请输入标准编号" :prefix-icon="Search" />

        <span class=" username " style="margin:0px 1vw 0vw 1.75vw">标准名称</span>
        <el-input v-model="Object_select.sName" placeholder="请输入标准名称" :prefix-icon="Search" />

        <span class=" userlevel" style="margin: 0 1vw">复核状态</span>
        <el-select v-model="Object_select.seReviewState" placeholder="请选择复核状态" size="large">
          <el-option v-for="item in U_options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-row>
    </div>
    <div style="text-align: left;margin-bottom: 3vh;">
      <span class="username " style="margin: 0 1vw">搜索金额</span>
      <el-input size="large" v-model="Object_select.sMoney" placeholder="请输入金额" :prefix-icon="Search" />

      <el-button type="primary" style="margin-left: 2vw" :icon="Search" @click="handleQuery">搜索</el-button>
      <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" :border="true" :row-style="{ height: '50px' }">
      <el-table-column fixed prop="seID" label="发放编号" width="130" />
      <el-table-column fixed prop="eName" label="档案名称" width="130" />
      <el-table-column fixed prop="sName" label="标准名称" width="130" />
      <el-table-column prop="seReviewState" label="复核状态" width="120" align="center">
        <template #default="scope">
          <!-- //tag -->
          <el-tag type="success" v-if="scope.row.seReviewState == 'success'">已复核</el-tag>
          <el-tag v-else-if="scope.row.seReviewState == 'null'">未复核</el-tag>
          <el-tag type="warning" v-else="scope.row.seReviewState == 'fall'">已驳回</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="seDate" label="发放时间" width="120" />
      <el-table-column prop="sBasic" label="基本工资" width="120" />
      <el-table-column prop="sTransport" label="交通补助" width="120" />
      <el-table-column prop="sLunch" label="午餐补助" width="120" />
      <el-table-column prop="sCommunicate" label="通讯补助" width="120" />
      <el-table-column prop="sPerson" label="养老保险" width="120" />
      <el-table-column prop="sMedical" label="医疗保险" width="120" />
      <el-table-column prop="sUnemployment" label="失业保险" width="120" />
      <el-table-column prop="seBonus" label="奖金" width="120" />
      <el-table-column prop="seFine" label="罚款" width="120" />
      <el-table-column prop="sTotal" label="总额" width="120" />
      <el-table-column prop="sComments" label="备注" width="120" />
      <el-table-column fixed="right" label="操作" a align="center" width="130">
        <template #default="scope">
          <el-button link type="primary" :icon="Edit" @click="handleUpdate(scope.row)">审核处理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationBox">
      <el-pagination background layout="prev, pager, next" @current-change="handlehCurrentChange"
        :current-page="state.CurrentPage" :page-size="state.PageSize" :total="state.Total" />
    </div>

  </div>

</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { Search, Refresh, Plus, Edit, CloseBold, Money } from '@element-plus/icons-vue'
import { Add, Update, Select, GetAllReview, Get } from '../../../api/SendSalary'
import type { FormInstance } from 'element-plus'
import { ElNotification, ElMessageBox } from 'element-plus'
import { useRouter } from "vue-router"

const router = useRouter();

//状态
const Object_select = reactive({
  sID: null,
  sName: '',
  sMoney: '',
  seReviewState: ''
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
  sRecordDate: '0000-00-00',
  sReviewUser: 1,
  sReviewDate: '0000-00-00',
  sComments: '',
})

const tableData = ref([]);

onMounted(async () => {
  await getList()
  getOptions()
})

// 获得全部
async function getList() {
  await GetAllReview().then((res: any) => {
    console.log(res.data);
    tableData.value = res.data
    queryTableData()
  })
}

/** 搜索按钮操作 */
async function handleQuery() {
  await getList();
  Select(Object_select).then((res: any) => {
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
  Object_select.seReviewState = ''
  Object_select.sMoney = ''
  getList();

}


// 编辑按钮操作
const handleUpdate = (row: any) => {
  console.log(row)
  router.push({
    path: '/home/Sareview_check',
    query: row
    // 多个参数这样的写法
    // query:{Shuju}
  })
}

// 获得选项栏的内容
const U_options = ref([{
  value: 'success',
  label: '已复核',
}, {
  value: 'null',
  label: '未复核',
}, {
  value: 'fall',
  label: '已驳回',
}]);
async function getOptions() {
  // GetAllUser().then((res: any) => {
  //   U_options.value = [];
  //   res.data.forEach((item: any) => {
  //     U_options.value.push({
  //       value: item.uID,
  //       label: item.uName,
  //     })
  //   })
  // })
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
  margin-top: 4vh;
}
</style>