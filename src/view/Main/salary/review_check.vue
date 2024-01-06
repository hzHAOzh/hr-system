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
          <el-col :span="24">
            <el-form-item label="发放编号" prop="seID">
              <el-input disabled v-model="ruleForm.seID" /> </el-form-item></el-col>
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
          <el-form ref="ruleFormRef" :model="ruleForm" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="标准编号" prop="sName">
                  <el-input disabled v-model="ruleForm.sID" placeholder="请输入标准编号" clearable :style="{ width: '100%' }">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="标准名称" prop="sName">
                  <el-input disabled v-model="ruleForm.sName" placeholder="请输入标准名称" clearable
                    :style="{ width: '100%' }">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-col :span="24">
              <el-form-item label="基本工资" prop="sBasic">
                <el-input disabled v-model="ruleForm.sBasic" placeholder="请输入基本工资" show-word-limit clearable
                  :prefix-icon=Money @change="BasicChange" :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="交通补助" prop="sTransport">
                  <el-input disabled v-model="ruleForm.sTransport" placeholder="请输入交通补助" clearable :prefix-icon=Money
                    @change="BasicChange" :style="{ width: '100%' }"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="午餐补助" prop="sLunch">
                  <el-input disabled v-model="ruleForm.sLunch" placeholder="请输入午餐补助" clearable :prefix-icon=Money
                    @change="BasicChange" :style="{ width: '100%' }"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="通讯补助" prop="sCommunicate">
                  <el-input disabled v-model="ruleForm.sCommunicate" placeholder="请输入通讯补助" clearable :prefix-icon=Money
                    @change="BasicChange" :style="{ width: '100%' }"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="养老保险" prop="sPerson">
                  <el-input v-model="ruleForm.sPerson" placeholder="请输入养老保险" clearable :prefix-icon=Money
                    :style="{ width: '100%' }" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="医疗保险" prop="sMedical">
                  <el-input v-model="ruleForm.sMedical" placeholder="请输入医疗保险" clearable :prefix-icon=Money
                    :style="{ width: '100%' }" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="失业保险" prop="sUnemployment">
                  <el-input v-model="ruleForm.sUnemployment" placeholder="请输入失业保险" clearable disabled :prefix-icon=Money
                    :style="{ width: '100%' }"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="奖金" prop="seBonus">
                  <el-input v-model="ruleForm.seBonus" placeholder="请输入奖金" clearable :prefix-icon=Money
                    :style="{ width: '100%' }" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="罚款" prop="seFine">
                  <el-input v-model="ruleForm.seFine" placeholder="请输入罚款" clearable disabled :prefix-icon=Money
                    :style="{ width: '100%' }"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-col :span="24">
              <el-form-item label="总金额" prop="sTotal">
                <el-input v-model="ruleForm.sTotal" placeholder="请输入总金额" :disabled='true' :prefix-icon=Money
                  :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="奖金" prop="seBonus">
                  <el-input v-model="ruleForm.seBonus" placeholder="请输入奖金" clearable :prefix-icon=Money
                    :style="{ width: '100%' }" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="罚款" prop="seFine">
                  <el-input v-model="ruleForm.seFine" placeholder="请输入罚款" clearable disabled :prefix-icon=Money
                    :style="{ width: '100%' }"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="发放人员" prop="seSendUser">
                  <el-select disabled v-model="ruleForm.seSendUser" placeholder="请选择记录人员" clearable
                    :style="{ width: '100%' }">
                    <el-option v-for="(item, index) in U_options" :key="index" :label="item.label"
                      :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="发放时间" prop="seDate">
                  <el-date-picker disabled :style="{ width: '100%' }" v-model="ruleForm.seDate" format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD" type="date" placeholder="请输入记录时间" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="复核人员" prop="seReviewUser">
                  <el-select v-model="ruleForm.seReviewUser" placeholder="请选择复核人员" clearable :style="{ width: '100%' }">
                    <el-option v-for="item in U_options" :key="item.value" :label="item.label"
                      :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="复核时间" prop="seReviewDate">
                  <el-date-picker clearable :style="{ width: '100%' }" v-model="ruleForm.seReviewDate"
                    format="YYYY/MM/DD" value-format="YYYY-MM-DD" type="date" placeholder="请输入复核时间" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-col :span="24">
              <el-form-item label="备注" prop="sComments">
                <el-input v-model="ruleForm.seNote" type="textarea" placeholder="请输入备注"
                  :autosize="{ minRows: 4, maxRows: 4 }" :style="{ width: '100%' }"></el-input>
              </el-form-item>
            </el-col>
          </el-form>


          <el-form-item class="result_button" style="margin-top:20px;padding-bottom:20px">
            <el-button size="large" type="success" @click="submitForm('success')">通过审核</el-button>
            <el-button size="large" type="danger" @click="submitForm('fall')">驳回审核</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Grid, Money } from "@element-plus/icons-vue";
//引入请求网络函数
import { getL1L2L3, GetAllPosition, getSendSalary, UpdateState, GetAllUser } from "../../../api/SendSalary";
//引入vue的内部对象
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { ElNotification, ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { useStore } from "../../../store/index";

const route = useRoute()
const router = useRouter()
// const sendsalary_Data = ref([]);
const formSize = ref("default");
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  eID: null,
  seID: null,
  eL1institutions: null,
  eL2institutions: null,
  eL3institutions: null,
  ePositionID: null,
  eName: "小明",
  seBonus: '',
  seFine: '',
  seReviewState: '',
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
  seSendUser: null,
  seDate: '0000-00-00',
  seReviewUser: 1,
  seReviewDate: '0000-00-00',
  seNote: '',
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

//审核按钮
const submitForm = async (value: any) => {
  ruleForm.seReviewState = value;
  UpdateState(ruleForm)
    .then((res: any) => {
      if (res.msg == "审核处理成功") {
        console.log(res);
        router.push('/home/send_review')
        ElNotification({
          title: '审核处理成功',
          message: '正在跳转审核列表界面',
          type: 'success',
        })
      }
      else {
        ElNotification({
          title: res.msg,
          message: '正在跳转审核列表界面',
          type: 'error',
        })
      }

    })
    .catch((err) => {
      console.log(err);
    });
  console.log('submit!')

}


const setRuleForm = (value: any) => {
  ruleForm.eID = parseInt(value.eID);
  ruleForm.eL1institutions = parseInt(value.eL1institutions)
  ruleForm.eL2institutions = parseInt(value.eL2institutions)
  ruleForm.eL3institutions = parseInt(value.eL3institutions)
  ruleForm.ePositionID = parseInt(value.ePositionID)
  ruleForm.eName = value.eName
  ruleForm.seID = value.seID
  ruleForm.sID = value.sID
  ruleForm.sName = value.sName
  ruleForm.sBasic = value.sBasic
  ruleForm.sTransport = value.sTransport
  ruleForm.sLunch = value.sLunch
  ruleForm.sCommunicate = value.sCommunicate
  ruleForm.sPerson = value.sPerson
  ruleForm.sMedical = value.sMedical
  ruleForm.sUnemployment = value.sUnemployment
  ruleForm.seBonus = value.seBonus
  ruleForm.seFine = value.seFine
  ruleForm.seReviewUser = parseInt(value.seReviewUser)
  ruleForm.seSendUser = parseInt(value.seSendUser)
  ruleForm.seDate = value.seDate
  ruleForm.seNote = value.seNote
  ruleForm.seReviewDate = null
  BasicChange()
}

// 计算保险值
function BasicChange() {
  ruleForm.sTotal = (parseInt(ruleForm.sBasic) + parseInt(ruleForm.sCommunicate) + parseInt(ruleForm.sLunch) + parseInt(ruleForm.sTransport) + parseInt(ruleForm.sMedical) + parseInt(ruleForm.sPerson) + parseInt(ruleForm.sUnemployment) - parseInt(ruleForm.seFine) + parseInt(ruleForm.seBonus)).toString()
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
const U_options = ref([{
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
  height: 125vh;
  // background-color: skyblue;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  // border-bottom: 1px solid #ebebeb;
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
