<template>
  <div class="common-layout">
    <el-container class="container">
      <el-aside class="red" width="250px">
        <Aside @title="getTitle"></Aside>
      </el-aside>
      <el-container class="green">
        <el-header class="orange" height="7vh">
          <Header :Head="Head"></Header>
        </el-header>
        <el-main class="blue">
          <router-view v-slot="{ Component }">
            <transition name="slide-fade-child" enter-active-class="animate__animated animate__fadeIn">
              <component class="child-view view2" :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Aside from "@/components/Aside.vue"; //在当前页面引入外部组件页面
import Header from "@/components/Header.vue"; //在当前页面引入外部组件页面
import { onMounted, reactive, ref } from "vue"; //引入需要用的vue

const addInfo = ref<any>(null); //获取组件的ref
const state = reactive({
  type: "add",
})
const Head = ref<String[]>([]);

const getTitle = (list: String[]) => {
  Head.value = list;
  // console.log('父传子', Head.value);

}


onMounted(async () => {

})
</script>
<style scoped lang="less">
:deep(.container) {
  background: #FFFFFF !important;
  height: 100vh;
  width: 100vw;
}

:deep(.head) {
  height: 8vh;
}

:deep(.red) {
  // background: red !important;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 8%);
  border-right: solid 1px #dcdfe6;
}

:deep(.orange) {
  // padding: 0;
  background-color: #fff;
  line-height: 8vh;
  height: 8vh;

  border-bottom: 1px solid rgb(229, 230, 235)
}

:deep(.green) {
  // background: green !important;
  background-color: rgb(242, 243, 245);
  // padding: 16px 20px 0;
}


:deep(.blue) {
  // background: green !important;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 8%);
  background-color: #FFFFFF;
  padding: 20px 20px 0;
  margin: 20px 20px 0;
  // padding: 16px 20px 0;
}

:deep(.el-menu) {
  border-right: 0;
}
</style>