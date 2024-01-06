<template>
  <div class="bg">
    <div class="common-layout">
      <el-container>
        <el-aside width="205px" style="padding-top:3vh ;">

          <el-input v-model="filterText" style="width:13vw;margin-bottom: 2vh;" placeholder="请输入机构名称"
            :prefix-icon="Search" />
          <div class="head-container">
            <el-tree :data="institutionOptions" :props="{ label: 'iName', children: 'children' }"
              :expand-on-click-node="false" :filter-node-method="filterNode" ref="treeRef" node-key="iID"
              default-expand-all highlight-current @node-click="handleNodeClick" />
          </div>
        </el-aside>
        <el-main>
          <div class="employee_input">
            <span class=" empinp_1 " style="    margin: 0px 0.5vw 0 1vw;">档案编号</span>
            <el-input v-model="Object_select.eID" style="width: 14vw;vw" placeholder="请输入档案编号" :prefix-icon="Search" />
            <span class=" empinp_1 " style="margin:0px 0.5vw 0 1vw">档案名称</span>
            <el-input v-model="Object_select.eName" style="width:15vw" placeholder="请输入档案名称" :prefix-icon="Search" />
            <span class="empinp_1" style="margin: 0px 0.5vw 0 1vw;">选择职位</span>
            <el-input v-model="Object_select.pName" style="width:15vw" placeholder="请输入职位名称" :prefix-icon="Search" />
          </div>
          <div style="text-align: left;margin-bottom: 3vh;">
            <el-row>


              <el-col :span="8">
                <el-button type="primary" style="margin-left: 21px" :icon="Search" @click="handleQuery">搜索</el-button>
                <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
                <el-popconfirm confirm-button-text="Yes" cancel-button-text="No" :icon="Position" icon-color="#626AEF"
                  title="你确定要为以下列表的档案发放薪酬吗?" @confirm="handleAdd">
                  <template #reference>
                    <el-button type="primary" plain :icon="Position">发放</el-button>
                  </template>
                </el-popconfirm>
              </el-col>

            </el-row>

          </div>
          <el-table :data="tableData" :border="true" style="width: 100%" :row-style="{ height: '50px' }">

            <el-table-column fixed prop="eName" label="档案名称" width="120" />
            <el-table-column prop="eID" label="档案编号" width="150" />
            <el-table-column label="所属机构" width="300">
              <template #default="scope">
                <div>{{ scope.row.l1Name + " / " + scope.row.l2Name + " / " + scope.row.l3Name }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="pName" label="所属职位" width="150" />
            <el-table-column prop="eState" label="档案复核状态" width="120" align="center">
              <template #default="scope">
                <!-- //tag -->
                <el-tag type="success" v-if="scope.row.eState == 'success'">已复核</el-tag>
                <el-tag v-else-if="scope.row.eState == 'null'">未复核</el-tag>
                <el-tag type="warning" v-else="scope.row.eState == 'fall'">已驳回</el-tag>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="Operations" width="120" align="center">
              <template #default="scope">
                <el-button @click="handleEdit(scope.row)">查看</el-button>

              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </div>
    <div class="paginationBox">
      <el-pagination background layout="prev, pager, next" @current-change="handlehCurrentChange"
        :current-page="state.CurrentPage" :page-size="state.PageSize" :total="state.Total" />
    </div>
    <!-- 发放对话框 -->
    <el-dialog :title="dialog_title" v-model="dialog_open" width="600px" append-to-body>
      <el-form ref="ruleFormRef" :model="Object_add" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="薪酬标准" prop="saID">
              <el-select v-model="Object_add.saID" placeholder="请选择薪酬标准" size="large">
                <el-option v-for="item in Sa_options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发放时间" prop="seDate">
              <el-date-picker v-model="Object_add.seDate" format="YYYY/MM/DD" clearable value-format="YYYY-MM-DD"
                type="date" placeholder="请输入发放时间" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">

            <el-form-item label="奖金" prop="seBonus">
              <el-input v-model="Object_add.seBonus" style="width:15vw" placeholder="请输入奖金" :prefix-icon="Money" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="罚款" prop="seFine">
              <el-input v-model="Object_add.seFine" style="width:15vw" placeholder="请输入罚款" :prefix-icon="Money" />
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
import { ref, nextTick, watch, toRefs, reactive, onMounted, computed } from 'vue'
import { GetAll, GetAllSalary, getAllInstitution, Get, Add, Update, Delete } from '../../../api/SendSalary'
import { Search, Refresh, Plus, Position, Money } from '@element-plus/icons-vue'
import { ElTree, ElMessageBox, ElNotification } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { useRouter } from "vue-router"

const ruleFormRef = ref<FormInstance>()
const router = useRouter();

const institutionOptions = ref(undefined);// 机构树
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    eID: undefined,
    eName: undefined,
    eState: undefined,
    ePositionID: undefined
  },
});
const tableData = ref([]);
const Object_select = reactive({
  eL1institutions: null,
  eL2institutions: null,
  eL3institutions: null,
  level: 1,
  eID: '',
  eName: '',
  eState: '',
  pName: ''
})
const rules = reactive({
  saID: {
    required: true,
    message: '请选择薪酬标准',
    trigger: 'blur'
  },
  seDate: {
    required: true,
    message: '请输入发送日期',
    trigger: 'blur'
  },
  seBonus: {
    required: true,
    message: '请输入奖金',
    trigger: 'blur'
  },
  seFine: {
    required: true,
    message: '请输入罚款',
    trigger: 'blur'
  }
})


onMounted(async () => {
  await getList()
  getOptions()

})
// 获得全部
async function getList() {
  await GetAll().then((res: any) => {
    console.log("表格数据", res.data);
    tableData.value = res.data
    queryTableData()

  })
  await getAllInstitution().then((res: any) => {
    institutionOptions.value = res.data
  })
}
//树状机构的过滤搜索方法
const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()
const filterNode = (value: string, data: any) => {
  if (!value) return true
  return data.iName.includes(value)
}
watch(filterText, (val) => {
  treeRef.value!.filter(val)
})
/** 节点单击事件 */
function handleNodeClick(data: any) {
  if (data.iLevel == 1) {
    Object_select.eL1institutions = data.iID
    Object_select.eL2institutions = null
    Object_select.eL3institutions = null
    Object_select.level = 1
  } else if (data.iLevel == 2) {
    Object_select.eL2institutions = data.iID
    Object_select.eL1institutions = null
    Object_select.eL3institutions = null
    Object_select.level = 2
  } else {
    Object_select.eL3institutions = data.iID
    Object_select.eL2institutions = null
    Object_select.eL1institutions = null
    Object_select.level = 3
  }
  Get(Object_select).then((res: any) => {
    console.log(Object_select.level);
    tableData.value = res.data
    queryTableData()

  })
  // queryParams.value.iID = data.id;
  handleQuery();
};
/** 重置按钮操作 */
function resetQuery() {
  Object_select.eL1institutions = null
  Object_select.eL2institutions = null
  Object_select.eL3institutions = null
  Object_select.level = 1
  Object_select.eID = '',
    Object_select.eName = '',
    Object_select.eState = '',
    Object_select.pName = ''
  getList();
}

/** 新增按钮操作 */
const dialog_title = ref("");
const dialog_open = ref(false);
const Object_add = reactive({
  sEmpID: null,
  saID: null,
  seState: '',
  seDate: null,
  seReviewState: 'null',
  seReviewDate: '0000-00-00',
  seSendUser: parseInt(window.localStorage.getItem('uID')),
  seBonus: '',
  seFine: ''
})
function handleAdd() {
  dialog_open.value = true;
  dialog_title.value = "薪酬发放";

}
/** 取消按钮 */
function cancel() {
  dialog_open.value = false;
  resetQuery();
}
/** 搜索按钮操作 */
async function handleQuery() {
  tableData.value = rebuildData(Object_select, tableData.value)
};

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
    if (element.eName.indexOf(value.eName) > -1 && (element.eID.toString() as string).search(value.eID) > -1 && element.pName.indexOf(value.pName) > -1) {
      newarr.push(element);
    }
  });
  console.log(newarr);
  queryTableData()
  return newarr
}

/** 提交按钮 */
function submitForm(formEl: FormInstance | undefined) {
  console.log(Object_add);
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!!", Object_add);
      if (dialog_title.value == "薪酬发放") {
        Object_add.seState = 'success';
        for (let i = 0; i < tableData.value.length; i++) {
          console.log(i);
          Object_add.sEmpID = tableData.value[i].eID;
          Add(Object_add).then((res: any) => {
            if (res.msg == "发放成功") {
              console.log(res);
              dialog_open.value = false;
            }
          })
        }
        ElNotification({
          title: '发放成功',
          message: '正在刷新列表',
          type: 'success',
        })
        getList()
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const handleEdit = (row: any) => {
  console.log(row)
  router.push({
    path: '/home/salary_check',
    query: row
    // 多个参数这样的写法
    // query:{Shuju}
  })
}

const options = [
  {
    value: 'success',
    label: '已复核',
  },
  {
    value: 'null',
    label: '未复核',
  },
  {
    value: 'fall',
    label: '已驳回',
  },
]

// 获得选项栏的内容
const Sa_options = ref([{
  value: '三级机构',
  label: 1,
}]);
async function getOptions() {
  GetAllSalary().then((res: any) => {
    console.log('123123', res.data);

    Sa_options.value = [];
    res.data.forEach((item: any) => {
      if (item.sState == 'success') {
        Sa_options.value.push({
          value: item.sID,
          label: item.sName,
        })
      }
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
.empinp_1 {
  height: 5vh;
  line-height: 5vh;
  font-weight: 700;
  width: 5vw;
}

.empinp_2 {
  height: 5vh;
  line-height: 5vh;
  font-weight: 700;
  width: 6vw;
}

.employee_input {
  margin-bottom: 18px;
  display: flex;
  align-items: center;
}

.paginationBox {
  margin: 15px;
}

:deep(.el-pagination) {
  justify-content: center;
}
</style>