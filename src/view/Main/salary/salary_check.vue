<template>
  <div class="ArchivesRegistration">
    <div class="ArchivesRegistrationContent">
      <div class="titletop">
        <div class="titleleft">
          <el-icon size="20">
            <Grid />
          </el-icon>
          <div class="title1">发放详情</div>
        </div>
        <!-- <div class="titleRight">
          <el-tag>为必填项</el-tag>
        </div> -->
      </div>
      <div class="containBox">
        <el-form ref="ruleFormRef" :model="ruleForm" label-width="120px" class="demo-ruleForm" :size="formSize"
          label-position="top" status-icon>
          <el-row>
            <el-col :span="12">
              <el-form-item label="档案编号" prop="eID">
                <el-input disabled v-model="ruleForm.eID" /> </el-form-item></el-col>
            <el-col :span="12">
              <el-form-item label="姓名" prop="eName">
                <el-input disabled v-model="ruleForm.eName" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider><el-tag>组织信息</el-tag></el-divider>

          <el-row>
            <el-col :span="5">
              <el-form-item label="一级机构" prop="eL1institutions">
                <el-select disabled v-model="ruleForm.eL1institutions" placeholder="请选择一级机构">
                  <el-option v-for="item in L1_options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item></el-col>
            <el-col :span="5"><el-form-item label="二级机构" prop="eL2institutions">
                <el-select disabled v-model="ruleForm.eL2institutions" placeholder="请选择二级机构">
                  <el-option v-for="item in L2_options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item></el-col>
            <el-col :span="5">
              <el-form-item label="三级机构" prop="eL3institutions">
                <el-select disabled v-model="ruleForm.eL3institutions" placeholder="请选择三级机构">
                  <el-option v-for="item in L3_options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item></el-col>

            <el-col :span="5"><el-form-item label="职位名称" prop="pName">
                <el-select disabled v-model="ruleForm.ePositionID" placeholder="请选择职位名称">
                  <el-option v-for="item in P_options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item></el-col>

          </el-row>
          <el-divider><el-tag>薪酬发放信息</el-tag></el-divider>
          <el-table :data="sendsalary_Data" :border="true" style="width: 100%" :row-style="{ height: '50px' }">
            <el-table-column fixed prop="seID" label="发放记录编号" width="150" />
            <el-table-column prop="eName" label="档案名称" width="168" />
            <el-table-column prop="sName" label="发放薪酬标准" width="200" />
            <el-table-column prop="seDate" label="发放时间" width="150" />
            <el-table-column prop="seReviewState" label="复核状态" width="150" align="center">
              <template #default="scope">
                <!-- //tag -->
                <el-tag type="success" v-if="scope.row.seReviewState == 'success'">已复核</el-tag>
                <el-tag v-else-if="scope.row.seReviewState == 'null'">待复核</el-tag>
                <el-tag type="warning" v-else>已驳回</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="seReviewDate" label="复核时间" width="150">
              <template #default="scope">
                <!-- //tag -->
                <div v-if="scope.row.seReviewDate == '0002-11-30'">null</div>
                <div v-else>{{ scope.row.seReviewDate }}</div>
              </template>
            </el-table-column>

            <el-table-column label="Operation" width="150" align="center">
              <template #default="scope">
                <el-button type="danger" @click="handleDelete(scope.row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>


          <el-form-item class="result_button" style="margin-top:20px">
            <el-button size="large" type="success" @click="returnTo()">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Grid } from "@element-plus/icons-vue";
//引入请求网络函数
import { getL1L2L3, GetAllPosition, getSendSalary, Delete } from "../../../api/SendSalary";
//引入vue的内部对象
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { ElNotification, ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { useStore } from "../../../store/index";

const route = useRoute()
const router = useRouter()
const sendsalary_Data = ref([]);
const formSize = ref("default");
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  eID: null,
  eL1institutions: null,
  eL2institutions: null,
  eL3institutions: null,
  ePositionID: null,
  eName: "小明",
});

onMounted(() => {
  console.log(route.query);
  if (route.query.eID != null) {
    console.log("yes");
    setRuleForm(route.query)
  } else {
    console.log("no ");
  }

  getL1L2L3List()
});

// 获得全部
async function getList(id: any) {
  await getSendSalary(id).then((res: any) => {
    console.log("表格数据", res.data);
    sendsalary_Data.value = res.data
  })

}


const handleDelete = (row: any) => {
  console.log(row)
  Delete(row.seID).then((res: any) => {
    ElMessageBox.confirm(
      '删除将无法撤回，您确定要这么做吗？',
      'error',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
      }
    ).then(() => {
      if (res.msg == "删除成功") {
        console.log(res);
        ElNotification({
          title: '删除成功',
          message: '正在刷新列表',
          type: 'success',
        })
        getList(ruleForm.eID)
      }
      else {
        ElNotification({
          title: res.msg,
          message: '正在刷新列表',
          type: 'error',
        })
      }
    })

  })
}

const setRuleForm = (value: any) => {
  ruleForm.eID = parseInt(value.eID);
  ruleForm.eL1institutions = parseInt(value.eL1institutions)
  ruleForm.eL2institutions = parseInt(value.eL2institutions)
  ruleForm.eL3institutions = parseInt(value.eL3institutions)
  ruleForm.ePositionID = parseInt(value.ePositionID)
  ruleForm.eName = value.eName
  getList(ruleForm.eID)
}

//取消返回
const returnTo = () => {
  router.push('/home/send')
}

/** 获取全部类别列表 */
const L1_options = ref([{
  value: '一级机构',
  label: 1,
}]);
const L2_options = ref([{
  value: '二级机构',
  label: 1,
}]);
const L3_options = ref([{
  value: '三级机构',
  label: 1,
}]);

const P_options = ref([{
  value: '三级机构',
  label: 1,
}]);
async function getL1L2L3List() {
  getL1L2L3().then((res: any) => {
    L1_options.value = [];
    L2_options.value = [];
    L3_options.value = [];
    res.data.L1.forEach((item: any) => {
      L1_options.value.push({
        value: item.iID,
        label: item.iName,
      })
    })
    res.data.L2.forEach((item: any) => {
      L2_options.value.push({
        value: item.iID,
        label: item.iName,
      })
    })
    res.data.L3.forEach((item: any) => {
      L3_options.value.push({
        value: item.iID,
        label: item.iName,
      })
    })
  })
  GetAllPosition().then((res: any) => {
    P_options.value = [];
    res.data.forEach((item: any) => {
      P_options.value.push({
        value: item.pID,
        label: item.pName,
      })
    })
  })
}


</script>

<style lang="less" scoped>
.ArchivesRegistration {
  width: 100%;
  height: 160vh;
  box-sizing: border-box;
  text-align: left;
  background-color: #f0f2f5;

  .ArchivesRegistrationContent {
    width: 100%;
    height: 100%;
    background-color: #fff;
    // border-radius: 10px;
    // box-shadow: 0 0 6px 6px rgba(0, 0, 0, 0.2);
  }
}

.titletop {
  width: 100%;
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9f9;
  padding-left: 10px;

  .titleleft {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;

    // background-color: red;
    .title1 {
      margin-left: 20px;
      font-size: 16px;
      color: #000;
      width: 600;
    }
  }

  .titleRight {
    width: 7%;
    height: 100%;
    display: flex;
    align-items: center;
    // background-color: red;
  }
}

.containBox {
  width: 100%;
  height: 160vh;
  // background-color: skyblue;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  border-bottom: 1px solid #ebebeb;
}

.containBox :deep(.el-form-item__label) {
  display: inline !important;
  width: auto !important;
}

.containBox :deep(.el-select-v2) {
  // display: inline !important;
  width: 100% !important;
}

.containBox :deep(.el-form) {
  width: 94% !important;
  height: 100% !important;
}

.containBox :deep(.el-form-item--default) {
  padding-right: 12px !important;
}

.containBox :deep(.el-textarea__inner) {
  resize: none;
  height: 103px;
}

:deep(.result_button .el-form-item__content) {
  justify-content: center !important;
}
</style>
