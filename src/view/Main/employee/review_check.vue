<template>
  <div class="ArchivesRegistration">
    <div class="ArchivesRegistrationContent">
      <div class="titletop">
        <div class="titleleft">
          <el-icon size="20">
            <Grid />
          </el-icon>
          <div class="title1">审核处理</div>
        </div>
        <!-- <div class="titleRight">
          <el-tag>为必填项</el-tag>
        </div> -->
      </div>
      <div class="containBox">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
          :size="formSize" label-position="top" status-icon>
          <el-row>
            <el-col :span="24">
              <el-form-item label="档案编号" prop="eID">
                <el-input disabled v-model="ruleForm.eID" /> </el-form-item></el-col>
          </el-row>
          <el-divider><el-tag>组织信息</el-tag></el-divider>

          <el-row>
            <el-col :span="5">
              <el-form-item label="一级机构" prop="eL1institutions">
                <el-select disabled v-model="ruleForm.eL1institutions" placeholder="请选择一级机构" @change="L1change">
                  <el-option v-for="item in L1_options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item></el-col>
            <el-col :span="5"><el-form-item label="二级机构" prop="eL2institutions">
                <el-select disabled v-model="ruleForm.eL2institutions" placeholder="请选择二级机构" @change="L2change">
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
          <el-divider><el-tag>个人信息</el-tag></el-divider>

          <el-row>
            <el-col :span="4">
              <el-form-item label="姓名" prop="eName">
                <el-input disabled v-model="ruleForm.eName" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="性别" prop="eGender">
                <el-select disabled v-model="ruleForm.eGender" placeholder="男">
                  <el-option label="男" value="男" />
                  <el-option label="女" value="女" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4"><el-form-item label="邮箱" prop="eEmail">
                <el-input disabled v-model="ruleForm.eEmail" />
              </el-form-item>
            </el-col>

            <el-col :span="4"><el-form-item label="手机" prop="eCellPhone">
                <el-input disabled v-model="ruleForm.ePhone" /> </el-form-item></el-col>
            <el-col :span="4"><el-form-item label="QQ" prop="eQQ">
                <el-input disabled v-model="ruleForm.eQQ" /> </el-form-item></el-col>
            <el-col :span="4"><el-form-item label="用户" prop="eUserid">
                <el-select disabled v-model="ruleForm.eUserid" placeholder="请选择类别">
                  <el-option v-for="item in U_options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select></el-form-item></el-col>
          </el-row>
          <el-row>
            <el-col :span="16"><el-form-item label="家庭地址 " prop="eAddress">
                <el-input disabled v-model="ruleForm.eAddress" type="textarea" :rows="4" style="resize: none" />
              </el-form-item></el-col>
            <el-col :span="8">
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="出身地" prop="eBornaddress">
                    <el-input disabled v-model="ruleForm.eBornaddress" /> </el-form-item></el-col>
                <el-col :span="12"><el-form-item label="邮编" prop="ePostcode">
                    <el-input disabled v-model="ruleForm.ePostcode" /> </el-form-item></el-col>
                <el-col :span="12"><el-form-item label="生日" prop="eBornaddress">
                    <el-date-picker disabled v-model="ruleForm.eBirthday" type="date" placeholder="Select date" />
                  </el-form-item></el-col>
                <el-col :span="12"><el-form-item label="年龄" prop="eAge">
                    <el-input disabled v-model="ruleForm.eAge" /> </el-form-item></el-col>
              </el-row>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="3"><el-form-item label="国籍" prop="eCountry">
                <el-input disabled v-model="ruleForm.eCountry" /> </el-form-item></el-col>
            <el-col :span="3"><el-form-item label="民族" prop="eNational">
                <el-input disabled v-model="ruleForm.eNational" /> </el-form-item></el-col>
            <el-col :span="3">
              <el-form-item label="宗教信仰" prop="eReligion">
                <el-select disabled v-model="ruleForm.eReligion" placeholder="无">
                  <el-option label="无" value="无" />
                  <el-option label="基督教" value="基督教" />
                  <el-option label="佛教" value="佛教" />
                  <el-option label="道教" value="道教" />
                </el-select> </el-form-item></el-col>
            <el-col :span="3">
              <el-form-item label="政治面貌" prop="ePolitical">
                <el-select disabled v-model="ruleForm.ePolitical" placeholder="共青团员">
                  <el-option label="群众" value="群众" />
                  <el-option label="共青团员" value="共青团员" />
                  <el-option label="党员" value="党员" />
                </el-select> </el-form-item></el-col>
            <el-col :span="3">
              <el-form-item label="学历" prop="eEdu_bg">
                <el-select disabled v-model="ruleForm.eEdu_bg" placeholder="大学">
                  <el-option label="初中" value="初中" />
                  <el-option label="职中" value="职中" />
                  <el-option label="高中" value="高中" />
                  <el-option label="大学" value="大学" />
                  <el-option label="研究生" value="研究生" />
                  <el-option label="博士" value="博士" />
                </el-select> </el-form-item></el-col>
            <el-col :span="3"><el-form-item label="学历专业" prop="eProfessional">
                <el-input disabled v-model="ruleForm.eProfessional" placeholder="软件工程" /> </el-form-item></el-col>
            <el-col :span="3"><el-form-item label="兴趣爱好" prop="eHobby">
                <el-input disabled v-model="ruleForm.eHobby" placeholder="小黑子篮球" /> </el-form-item></el-col>
            <el-col :span="3"><el-form-item label="特长" prop="eSpecically">
                <el-input disabled v-model="ruleForm.eSpecically" placeholder="特长" /> </el-form-item></el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-row>
                <el-col :span="24"><el-form-item label="身份证号码" prop="eIdentityID">
                    <el-input disabled v-model="ruleForm.eIdentityID" /> </el-form-item></el-col>
                <el-col :span="24">
                  <el-form-item label="社会保障号码" prop="eSSC">
                    <el-input disabled v-model="ruleForm.eSSC" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-form-item label="家庭关系 " prop="eFamily">
                <el-input disabled v-model="ruleForm.eFamily" type="textarea" :rows="4" style="resize: none" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="个人简历 " prop="ePsn_experience">
                <el-input disabled v-model="ruleForm.ePsn_experience" type="textarea" :rows="6" style="resize: none" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-divider><el-tag>薪酬信息</el-tag></el-divider>
          <el-row>
            <el-col :span="8">
              <el-form-item label="薪酬标准" prop="eSalary">
                <el-select disabled-v2 v-model="ruleForm.eSalary" placeholder="薪酬标准" :options="options" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户行" prop="eBankName">
                <el-select disabled-v2 v-model="ruleForm.eBankName" placeholder="开户银行" :options="options" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户账号" prop="eBankAccount">
                <el-input disabled v-model="ruleForm.eBankAccount" />
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-divider><el-tag>其它信息</el-tag></el-divider>
          <el-row>
            <el-col :span="12">
              <el-form-item label="档案备注 " prop="eNote">
                <el-input v-model="ruleForm.eNote" type="textarea" :rows="4" style="resize: none" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="复核日期" prop="eReviewDate">

                    <el-date-picker v-model="ruleForm.eReviewDate" format="YYYY/MM/DD" value-format="YYYY-MM-DD"
                      type="date" placeholder="Select date" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="复核人员" prop="eReviewer">
                    <el-select v-model="ruleForm.eReviewer" placeholder="请选择类别">
                      <el-option v-for="item in U_options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="登记日期" prop="eFiling_time">

                    <el-date-picker disabled v-model="ruleForm.eFiling_time" format="YYYY/MM/DD"
                      value-format="YYYY-MM-DD" type="date" placeholder="Select date" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="登记人" prop="eRecoders">
                    <el-select disabled v-model="ruleForm.eRecoders" placeholder="请选择类别">
                      <el-option v-for="item in U_options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <el-form-item class="result_button" style="margin-top:20px">
            <el-button size="large" type="success" @click="submitForm('success')">通过审核</el-button>
            <el-button size="large" type="danger" @click="submitForm('fall')">驳回审核</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Grid } from "@element-plus/icons-vue";
//引入请求网络函数
import { getL1L2L3, GetAllPosition, GetAllUser, UpdateState } from "../../../api/employee";
//引入vue的内部对象
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { useStore } from "../../../store/index";

const route = useRoute()
const router = useRouter()

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  eID: null,
  eL1institutions: null,
  eL2institutions: null,
  eL3institutions: null,
  ePositionID: null,
  pName: '',
  ptName: '',
  eName: "小明",
  eAge: "22",
  eGender: "男",
  eEmail: "123456@qq.com",
  ePhone: "手机号",
  eQQ: "123456",
  eAddress: "湛江",
  ePostcode: "12345",
  eBornaddress: "广东",
  eBirthday: "2022-12-13",
  eCountry: "中国",
  eNational: "汉族",
  eReligion: "宗教信仰",
  ePolitical: "政治面貌",
  eEdu_bg: "学历",
  eProfessional: "学历专业",
  eHobby: "爱好",
  eSpecically: "特长",
  eIdentityID: "123456789012345678",
  eState: "null",
  eSSC: "12345678901",
  eFamily: "家庭关系",
  eFiling_time: "2022-12-13",
  ePsn_experience: "个人简历",
  eNote: "档案备注",
  eRecoders: 1,
  eUserid: 1,
  eSalary: 1,
  eRecoderName: '',
  eReviewer: null,
  eReviewDate: "2022-12-13",
});
const rules = reactive({
  eL1institutions: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
  ],
  eL2institutions: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
  ],
  eL3institutions: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
  ],
  ePositionID: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
  ],
  eName: [
    { required: true, message: "Please input Activity data", trigger: "blur" },
  ],
  eAge: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
  ],
  eGender: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
  ],
  ePhone: [
    { required: true, message: "Please input Activity data", trigger: "blur" },
    { min: 11, max: 11, message: "固定号码需要11位", trigger: "blur" },
  ],
  eEmail: [
    {
      required: true,
      type: "email",
      message: "Please input correct email address",
      trigger: ["blur", "change"],
    },
  ],
  eQQ: [
    { required: true, message: "Please input Activity data", trigger: "blur" },
    { min: 6, max: 10, message: "QQ需要10位", trigger: "blur" },
  ],
  eAddress: [
    { required: true, message: "Please input Activity data", trigger: "blur" },
  ],
  eBornaddress: [
    { required: true, message: "Please input Activity data", trigger: "blur" },
  ],
  ePostcode: [
    { required: true, message: "Please input Activity data", trigger: "blur" },
    { min: 5, max: 5, message: "邮政编码需要5位", trigger: "blur" },
  ],
  eCountry: [
    { required: true, message: "Please input Activity data", trigger: "blur" },
  ],
  eNational: [
    { required: true, message: "Please input Activity data", trigger: "blur" },
  ],
  eIdentityID: [
    { required: true, message: "Please input Activity data", trigger: "blur" },
    { min: 18, max: 18, message: "身份证号码需要18位", trigger: "blur" },
  ],
  eSSC: [
    { required: true, message: "Please input Activity data", trigger: "blur" },
    { min: 11, max: 11, message: "社会保障号码需要11位", trigger: "blur" },
  ],
  eRecoders: [
    {
      required: true,
      message: "请输入登记人信息",
      trigger: "change",
    },
  ]
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



const setRuleForm = (value: any) => {
  ruleForm.eID = parseInt(value.eID);
  ruleForm.eL1institutions = parseInt(value.eL1institutions)
  ruleForm.eL2institutions = parseInt(value.eL2institutions)
  ruleForm.eL3institutions = parseInt(value.eL3institutions)
  ruleForm.ePositionID = parseInt(value.ePositionID)
  ruleForm.eName = value.eName
  ruleForm.eGender = value.eGender
  ruleForm.eEmail = value.eEmail
  ruleForm.ePhone = value.ePhone
  ruleForm.eQQ = value.eQQ
  ruleForm.eAddress = value.eAddress
  ruleForm.ePostcode = value.ePostcode
  ruleForm.eCountry = value.eCountry
  ruleForm.eBornaddress = value.eBornaddress
  ruleForm.eBirthday = value.eBirthday
  ruleForm.eNational = value.eNational
  ruleForm.eState = value.eState
  ruleForm.eIdentityID = value.eIdentityID
  ruleForm.eAge = value.eAge
  ruleForm.eEdu_bg = value.eEdu_bg
  ruleForm.eProfessional = value.eProfessional
  ruleForm.eSSC = value.eSSC
  ruleForm.eSpecically = value.eSpecically
  ruleForm.ePolitical = value.ePolitical
  ruleForm.eHobby = value.eHobby
  ruleForm.eFiling_time = value.eFiling_time
  ruleForm.ePsn_experience = value.ePsn_experience
  ruleForm.eFamily = value.eFamily
  ruleForm.eNote = value.eNote
  ruleForm.eRecoders = parseInt(value.eRecoders)
  ruleForm.eUserid = parseInt(value.eUserid)
  ruleForm.eReviewer = parseInt(value.eReviewer)
  ruleForm.eReviewDate = value.eReviewDate
}

const submitForm = async (value: any) => {
  ruleForm.eState = value;
  UpdateState(ruleForm)
    .then((res: any) => {
      if (res.msg == "审核处理成功") {
        console.log(res);
        router.push('/home/emp_review')
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

const resetForm = (formEl: any) => {
  if (!formEl) return;
  // formEl.resetFields();
};


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
function L1change() {
  ruleForm.eL2institutions = null;
  ruleForm.eL3institutions = null;
  getL1L2L3().then((res: any) => {
    L2_options.value = [];
    L3_options.value = [];
    res.data.L2.forEach((item: any) => {
      if (item.iParents == ruleForm.eL1institutions) {
        L2_options.value.push({
          value: item.iID,
          label: item.iName,
        })
      }
    })
  })
}
function L2change() {
  ruleForm.eL3institutions = null;
  getL1L2L3().then((res: any) => {
    L3_options.value = [];
    res.data.L3.forEach((item: any) => {
      if (item.iParents == ruleForm.eL2institutions) {
        L3_options.value.push({
          value: item.iID,
          label: item.iName,
        })
      }
    })
  })
}


//取消返回
const returnTo = () => {
  router.push('/home/employee')
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
