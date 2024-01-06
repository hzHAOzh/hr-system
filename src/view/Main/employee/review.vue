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
            <el-input v-model="Object_select.eName" style="width:15vw" placeholder="请输入档案名称" :prefix-icon="Search" />
          </div>
          <div style="text-align: left;margin-bottom: 3vh;">
            <span class=" empinp_2" style="margin: 0px 13px 0 21px">档案状态</span>
            <el-select v-model="Object_select.eState" placeholder="请选择档案状态">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-button type="primary" style="margin-left: 21px" :icon="Search" @click="handleQuery">搜索</el-button>
            <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
          </div>
          <el-table :data="tableData" row-key="iID" style="width: 100%" :row-style="{ height: '50px' }"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">

            <el-table-column fixed prop="eName" label="档案名称" width="120" />
            <el-table-column prop="eID" label="档案编号" width="180" />
            <el-table-column label="所属机构" width="300">
              <template #default="scope">
                <div>{{ scope.row.l1Name + " / " + scope.row.l2Name + " / " + scope.row.l3Name }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="pName" label="所属职位" width="180" />
            <el-table-column fixed prop="eState" label="复核状态" width="120">
              <template #default="scope">
                <!-- //tag -->
                <el-tag type="success" v-if="scope.row.eState == 'success'">已复核</el-tag>
                <el-tag v-else-if="scope.row.eState == 'null'">未复核</el-tag>
                <el-tag type="danger" v-else="scope.row.eState == 'fall'">已驳回</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="eGender" label="所属职位" width="180" />
            <el-table-column prop="eEmail" label="邮箱" width="180" />
            <el-table-column prop="ePhone" label="手机" width="180" />
            <el-table-column prop="eQQ" label="QQ" width="180" />
            <el-table-column prop="eAddress" label="家庭地址" width="180" />
            <el-table-column prop="ePostcode" label="邮编" width="180" />
            <el-table-column prop="eCountry" label="国籍" width="180" />
            <el-table-column prop="eBornaddress" label="出身地" width="180" />
            <el-table-column prop="eBirthday" label="生日" width="180" />
            <el-table-column prop="ePolitical" label="政治面貌" width="180" />
            <el-table-column prop="eNational" label="民族" width="180" />
            <el-table-column prop="eIdentityID" label="身份证号码" width="180" />
            <el-table-column prop="eAge" label="年龄" width="180" />
            <el-table-column prop="eEdu_bg" label="学历" width="180" />
            <el-table-column prop="eProfessional" label="专业" width="180" />
            <el-table-column prop="eFiling_time" label="记录时间" width="180" />
            <el-table-column prop="recoderName" label="记录人员" width="180" />
            <el-table-column prop="userName" label="所属账号" width="180" />
            <el-table-column prop="eSSC" label="社会保障号码" width="180" />
            <el-table-column prop="eHobby" label="爱好" width="180" />
            <el-table-column prop="eSpecically" label="特长" width="180" />
            <el-table-column prop="eReviewer" label="复核人员" width="180" />
            <el-table-column prop="eReviewDate" label="复核时间" width="180" />
            <el-table-column fixed="right" label="Operations" width="100" align="center">
              <template #default="scope">
                <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">审核处理</el-button>
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
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, toRefs, reactive, onMounted } from 'vue'
import { GetAll, getAllInstitution, Get } from '../../../api/employee'
import { Search, Refresh, Plus, Sort } from '@element-plus/icons-vue'
import { ElTree } from 'element-plus'
import { useRouter } from "vue-router"
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
onMounted(async () => {
  await getList()
})
// 获得全部
async function getList() {
  await GetAll().then((res: any) => {
    tableData.value = res.data
    queryTableData()
    console.log(tableData.value);
  })
  getAllInstitution().then((res: any) => {
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
    queryTableData()
    tableData.value = res.data
  })
  // queryParams.value.iID = data.id;
  // handleQuery();
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

/** 搜索按钮操作 */
async function handleQuery() {
  // queryParams.value.pageNum = 1;
  await getList()
  tableData.value = rebuildData(Object_select, tableData.value)
  queryTableData()
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
    if (element.eName.indexOf(value.eName) > -1 && (element.eID.toString() as string).search(value.eID) > -1 && element.eState.indexOf(value.eState) > -1 && element.pName.indexOf(value.pName) > -1) {
      newarr.push(element);
    }
  });
  console.log(newarr);
  return newarr
}
// 审核处理功能实现
const handleEdit = (index: number, row: any) => {
  console.log(index, row)
  router.push({
    path: '/home/Empreview_check',
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