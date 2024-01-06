<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="350px" style="border-right: 1px solid rgb(242, 243, 245);padding: 10px;">
        <el-card class="box-card" style="height: 40vh;">
          <template #header>
            <div class="card-header">
              <span>欢迎回来！</span>
              <el-button class="button" text>{{ store.uName }}</el-button>
            </div>
          </template>
          <div class="text item">用户编号：<el-button class="button" text>{{ store.uID }}</el-button></div>
          <div class="text item">用户职称：<el-button class="button" text>{{ store.pName }}</el-button></div>
          <div class="text item">用户权限： <el-tag> {{ store.ptRole }}</el-tag></div>
        </el-card>
      </el-aside>
      <el-main>

        <div>
          <div class="arco-grid panel" data-v-303654f4=""
            style="gap: 16px 0px;grid-template-columns: repeat(24, minmax(0px, 1fr));">
            <div class="arco-grid-item panel-col" style="grid-column: span 12 / span 12;">
              <div class="arco-space arco-space-horizontal arco-space-align-center">
                <div class="arco-space-item" style="margin-right: 8px;">
                  <div class="arco-avatar arco-avatar-circle col-avatar"
                    style="width: 54px; height: 54px; font-size: 27px;"><span class="arco-avatar-image"><img
                        alt="avatar"
                        src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image"></span>
                    <!--v-if-->
                  </div>
                </div>
                <div class="arco-space-item">
                  <div class="arco-statistic">
                    <div class="arco-statistic-title">总档案数</div>
                    <div class="arco-statistic-content">
                      <div class="arco-statistic-value">
                        <!--v-if--><span class="arco-statistic-value-integer">{{ tableData.employee }}</span> <span
                          class="unit">个</span>
                      </div>
                      <!--v-if-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="arco-grid-item panel-col" style="grid-column: span 12 / span 12;">
              <div class="arco-space arco-space-horizontal arco-space-align-center">
                <div class="arco-space-item" style="margin-right: 8px;">
                  <div class="arco-avatar arco-avatar-circle col-avatar"
                    style="width: 54px; height: 54px; font-size: 27px;"><span class="arco-avatar-image"><img
                        alt="avatar"
                        src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image"></span>
                    <!--v-if-->
                  </div>
                </div>
                <div class="arco-space-item">
                  <div class="arco-statistic">
                    <div class="arco-statistic-title">总机构数</div>
                    <div class="arco-statistic-content">
                      <div class="arco-statistic-value">
                        <!--v-if--><span class="arco-statistic-value-integer">{{ tableData.institution }}</span>
                        <!--v-if--><span class="arco-statistic-suffix"><span class="unit">个</span></span>
                      </div>
                      <!--v-if-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="arco-grid-item panel-col" style="grid-column: span 12 / span 12;">
              <div class="arco-space arco-space-horizontal arco-space-align-center">
                <div class="arco-space-item" style="margin-right: 8px;">
                  <div class="arco-avatar arco-avatar-circle col-avatar"
                    style="width: 54px; height: 54px; font-size: 27px;"><span class="arco-avatar-image"><img
                        alt="avatar"
                        src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image"></span>
                    <!--v-if-->
                  </div>
                </div>
                <div class="arco-space-item">
                  <div class="arco-statistic">
                    <div class="arco-statistic-title">总用户数</div>
                    <div class="arco-statistic-content">
                      <div class="arco-statistic-value">
                        <!--v-if--><span class="arco-statistic-value-integer">{{ tableData.users }}</span>
                        <!--v-if--><span class="arco-statistic-suffix"><span class="unit">人</span></span>
                      </div>
                      <!--v-if-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="arco-grid-item panel-col" style="grid-column: span 12 / span 12; ">
              <div class="arco-space arco-space-horizontal arco-space-align-center">
                <div class="arco-space-item" style="margin-right: 8px;">
                  <div class="arco-avatar arco-avatar-circle col-avatar"
                    style="width: 54px; height: 54px; font-size: 27px;"><span class="arco-avatar-image"><img
                        alt="avatar"
                        src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image"></span>
                    <!--v-if-->
                  </div>
                </div>
                <div class="arco-space-item">
                  <div class="arco-statistic">
                    <div class="arco-statistic-title">薪酬发放数</div>
                    <div class="arco-statistic-content">
                      <div class="arco-statistic-value">
                        <!--v-if--><span class="arco-statistic-value-integer">{{ tableData.sendsalary }}</span>
                        <!--v-if--><span class="arco-statistic-suffix"><span class="unit">个</span></span>
                      </div>
                      <!--v-if-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="arco-grid-item panel-col" style="grid-column: span 12 / span 12;">
              <div class="arco-space arco-space-horizontal arco-space-align-center">
                <div class="arco-space-item" style="margin-right: 8px;">
                  <div class="arco-avatar arco-avatar-circle col-avatar"
                    style="width: 54px; height: 54px; font-size: 27px;"><span class="arco-avatar-image"><img
                        alt="avatar"
                        src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image"></span>
                    <!--v-if-->
                  </div>
                </div>
                <div class="arco-space-item">
                  <div class="arco-statistic">
                    <div class="arco-statistic-title">总职位数</div>
                    <div class="arco-statistic-content">
                      <div class="arco-statistic-value">
                        <!--v-if--><span class="arco-statistic-value-integer">{{ tableData.position }}</span>
                        <!--v-if--><span class="arco-statistic-suffix"><span class="unit">个</span></span>
                      </div>
                      <!--v-if-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="arco-grid-item panel-col" style="grid-column: span 12 / span 12; ">
              <div class="arco-space arco-space-horizontal arco-space-align-center">
                <div class="arco-space-item" style="margin-right: 8px;">
                  <div class="arco-avatar arco-avatar-circle col-avatar"
                    style="width: 54px; height: 54px; font-size: 27px;"><span class="arco-avatar-image"><img
                        alt="avatar"
                        src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image"></span>
                    <!--v-if-->
                  </div>
                </div>
                <div class="arco-space-item">
                  <div class="arco-statistic">
                    <div class="arco-statistic-title">薪酬标准数</div>
                    <div class="arco-statistic-content">
                      <div class="arco-statistic-value">
                        <!--v-if--><span class="arco-statistic-value-integer">{{ tableData.salary }}</span>
                        <!--v-if--><span class="arco-statistic-suffix"><span class="unit">个</span></span>
                      </div>
                      <!--v-if-->
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="arco-grid-item" style="grid-column: span 24 / span 24;">
              <div role="separator" class="arco-divider arco-divider-horizontal panel-border">
                <!---->
              </div>
            </div>
          </div>
        </div>

      </el-main>
    </el-container>
    <div id="main" style="height:60vh;width:64%;border-top: 1px solid rgb(242, 243, 245);display: inline-block;">
    </div>
    <div id="main1"
      style="height:60vh;width:30%;border-top: 1px solid rgb(242, 243, 245);display: inline-block;padding-top: 5px;">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { useStore } from "../../store/index";
import { getAllInstitution, GetAllusers, GetAllsendsalary, GetAllposition, GetAllsalary, GetAllemployee, GetAllType, Get } from "../../api/count";
import * as echarts from 'echarts';
const store = useStore()
store.uID = window.localStorage.getItem('uID')
store.uName = window.localStorage.getItem('uName')
store.pName = window.localStorage.getItem('pName')
store.ptRole = window.localStorage.getItem('ptRole')
const tableData = reactive({
  institution: null,
  position: null,
  sendsalary: null,
  salary: null,
  employee: null,
  users: null,
});
const userData = reactive({
  institution: null,
  position: null,
  sendsalary: null,
  salary: null,
  employee: null,
  users: null,
})
onMounted(async () => {
  await getList()
  const myChart = echarts.init(document.getElementById('main'));
  const myChart1 = echarts.init(document.getElementById('main1'));
  myChart.setOption({
    title: {
      text: '数据柱状图',
      left: 'center',
      y: 8
    },
    tooltip: {},

    xAxis: {
      data: ['总档案数', '总机构数', '总用户数', '薪酬发放数', '总职位数', '薪酬标准数']
    },
    yAxis: {},
    series: [
      {
        name: '个数',
        type: 'bar',
        data: [
          {
            value: arr.value[0],
            itemStyle: {
              color: '#BEDAFF'
            }
          },
          {
            value: arr.value[1],
            itemStyle: {
              color: '#94BFFF'
            }
          },
          {
            value: arr.value[2],
            itemStyle: {
              color: '#4080FF'
            }
          },
          {
            value: arr.value[3],
            itemStyle: {
              color: '#0E42D2'
            }
          },
          {
            value: arr.value[4],
            itemStyle: {
              color: '#7BC0FC'
            }
          },
          {
            value: arr.value[5],
            itemStyle: {
              color: '#3491FA'
            }
          },
        ]
      }
    ]
  });
  myChart1.setOption({
    title: {
      text: '职位分布',
      left: 'center',
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: options.value
      }
    ]
  });
});

const arr = ref([0, 1, 1, 10, 10, 10]);
const options = ref([]);
const Object_select = reactive({
  pID: null,
  pName: '',
  ptName: '',
  ptRole: ''
})
// 获得全部
async function getList() {
  await getAllInstitution().then((res: any) => {
    tableData.institution = res.data.length
    arr.value[1] = res.data.length
  });
  await GetAllusers().then((res: any) => {
    tableData.users = res.data.length
    arr.value[2] = res.data.length

  });

  await GetAllsendsalary().then((res: any) => {
    console.log(res.data);
    tableData.sendsalary = res.data.length
    arr.value[3] = res.data.length

  });

  await GetAllposition().then((res: any) => {
    tableData.position = res.data.length
    arr.value[4] = res.data.length

  });

  await GetAllemployee().then((res: any) => {
    tableData.employee = res.data.length
    arr.value[0] = res.data.length
    for (let i = 0; i < res.data.length; i++) {
      options.value.push({
        name: res.data[i].pName,
        value: 1
      })
    }
    for (let i = 0; i < options.value.length; i++) {
      for (let j = i + 1; j < options.value.length; j++) {
        if (options.value[i].name === options.value[j].name) {
          //console.log('重复',data[i],data[j])
          options.value[i].value = options.value[i].value + options.value[j].value
          options.value.splice(j, 1)
        }
      }
    }

  });

  await GetAllsalary().then((res: any) => {
    tableData.salary = res.data.length
    arr.value[5] = res.data.length

  });


  // for (let i = 0; i < options.value.length; i++) {
  //   Object_select.pName = options.value[i].name
  //   await Get(Object_select).then((res: any) => {
  //     options.value[i].value = res.data.length
  //   })
  // }
  /** 搜索按钮操作 */


}
</script>

<style scoped>
.all {
  background-color: #fff;
  border-radius: 4px;
  overflow: auto;
  margin-bottom: 0;
  padding: 16px 20px 0 20px;
  display: grid;
}

.arco-grid.panel {
  margin-bottom: 0;
  padding: 16px 20px 0 20px;
}

.panel {
  background-color: #fff;
  border-radius: 4px;
  overflow: auto;
}

.arco-grid {
  display: grid;
}

.space-unit {
  background-color: #fff;
  border-radius: 4px;
}

.panel-col {
  padding-left: 43px;
  text-align: left;
  border-right: 1px solid rgb(242, 243, 245);
}

.arco-space-align-center {
  align-items: center;
}

.arco-space {
  display: inline-flex;
}

.arco-space-horizontal .arco-space-item {
  display: flex;
  align-items: center;
}

.col-avatar[data-v-00712248] {
  margin-right: 12px;
  background-color: rgb(242, 243, 245);
}

.arco-avatar-circle {
  border-radius: 50%;
}

.arco-avatar-circle .arco-avatar-image {
  overflow: hidden;
  border-radius: 50%;
}

.arco-avatar-image {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.arco-statistic {
  display: inline-block;
  color: var(78, 89, 105);
  line-height: 1.5715;
}

.arco-statistic-title {
  margin-bottom: 8px;
  font-size: 14px;
  color: var(78, 89, 105);
}

.arco-statistic-content .arco-statistic-value {
  color: rgb(29, 33, 41);
  font-weight: 500;
  font-size: 26px;
  white-space: nowrap;
}

.arco-statistic-content .arco-statistic-value-integer {
  font-size: 26px;
  white-space: nowrap;
}

.arco-statistic-content .arco-statistic-value-decimal {
  display: inline-block;
  font-size: 26px;
}

.unit {
  margin-left: 8px;
  color: rgb(78, 89, 105);
  font-size: 12px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 15px 0;
}
</style>