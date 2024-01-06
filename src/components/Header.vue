<template>
  <div class="head">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in Head">{{ item
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="avatar">
      <el-button @click="logOutHandle">退出</el-button>

      <!-- <el-popover placement="bottom" width="60" trigger="hover">
        <template #reference>
          <el-avatar shape="square" :size="40" :src="squareUrl" />
        </template>
      </el-popover> -->
    </div>
  </div>

</template>
<script lang="ts" setup>
import { defineProps, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from "../store/index";
const store = useStore()
//周期函数
const Head = ref<any>([])
const squareUrl = ref('https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png')
const visible = ref(false)
const router = useRouter();
onMounted(() => {
  //打印父组件传递的值
})
// 监听路由变化
watch(() => router.currentRoute.value.path, () => {
  // console.log(router.currentRou  te.value.path);
  Head.value = [];
  router.currentRoute.value.matched.forEach((item) => {
    Head.value.push(item.name)
  })
}, {
  immediate: true, deep: true
})
// 退出登录
const logOutHandle = () => {
  window.localStorage.setItem('isLogin', '');
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('uID');
  window.localStorage.removeItem('uName');
  window.localStorage.removeItem('ptRole');
  window.localStorage.removeItem('pName');
  store.uID = null;
  store.uName = '';
  store.ptRole = '';
  router.push({ name: 'login' })
}
//接受父组件传来的数据
const props = defineProps({
  Head: {}
})

</script>
<style scoped lang="less">
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:deep(.el-breadcrumb__item) {
  line-height: 7vh;

}

:deep(.avatar) {
  margin: 4px;
}

.avatar {
  text-align: right;
  line-height: 40px;
}

:deep(.el-avatar--square) {
  margin: 5px;
}

.breadcrumb {
  max-width: 50vw;
}
</style>